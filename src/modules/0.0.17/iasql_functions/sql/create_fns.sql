 -- TODO: Does this belong here or in a similar file in the iasql_platform module?
CREATE
OR REPLACE FUNCTION iasql_audit () RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
begin
  if (TG_OP = 'INSERT') then
    INSERT INTO iasql_audit_log (ts, "user", table_name, change_type, change)
    VALUES (now(), user, TG_TABLE_NAME, 'INSERT', ('{"change":' || to_json(NEW.*) || '}')::json);
  elsif (TG_OP = 'DELETE') then
    INSERT INTO iasql_audit_log (ts, "user", table_name, change_type, change)
    VALUES (now(), user, TG_TABLE_NAME, 'DELETE', ('{"original":' || to_json(OLD.*) || '}')::json);
  elsif (TG_OP = 'UPDATE') then
    INSERT INTO iasql_audit_log (ts, "user", table_name, change_type, change)
    VALUES (now(), user, TG_TABLE_NAME, 'UPDATE', ('{"original":' || to_json(OLD.*) || ', "change":' || to_json(NEW.*) || '}')::json);
  end if;
  return NULL;
end;
$$;

CREATE
OR REPLACE FUNCTION until_iasql_operation (_optype iasql_operation_optype_enum, _params TEXT[]) RETURNS UUID LANGUAGE plpgsql SECURITY DEFINER AS $$
declare
    _opid uuid;
    _counter integer := 0;
    _output text;
    _err text;
    _dblink_sql text;
    _db_id text;
    _dblink_conn_count int;
begin
    select md5(random()::text || clock_timestamp()::text)::uuid into _opid;
    select current_database() into _db_id;
    -- reuse the 'iasqlopconn' db dblink connection if one exists for the session
    -- dblink connection closes automatically at the end of a session
    SELECT count(1) INTO _dblink_conn_count FROM dblink_get_connections()
        WHERE dblink_get_connections@>'{iasqlopconn}';
    IF _dblink_conn_count = 0 THEN
        PERFORM dblink_connect('iasqlopconn', 'loopback_dblink_' || _db_id);
    END IF;
    -- schedule job via dblink
    _dblink_sql := format('insert into iasql_operation (opid, optype, params) values (%L, %L, array[''%s'']::text[]);', _opid, _optype, array_to_string(_params, ''','''));
    -- raise exception '%', _dblink_sql;
    PERFORM dblink_exec('iasqlopconn', _dblink_sql);
    _dblink_sql := format('select graphile_worker.add_job(%L, json_build_object(%L, %L, %L, %L, %L, array[''%s'']::text[]));', 'operation', 'opid', _opid, 'optype', _optype, 'params', array_to_string(_params, ''','''));
    -- raise exception '%', _dblink_sql;
    -- allow statement that returns results in dblink https://stackoverflow.com/a/28299993
    PERFORM * FROM dblink('iasqlopconn', _dblink_sql) alias(col text);
    -- times out after 45 minutes = 60 * 45 = 2700 seconds
    -- currently the longest is RDS where the unit test has a timeout of 16m
    while _counter < 2700 loop
        if (select end_date from iasql_operation where opid = _opid) is not null then
            select output into _output from iasql_operation where opid = _opid;
            select err into _err from iasql_operation where opid = _opid;
            -- done!
            if _output is not null and _err is null then
                return _opid;
            end if;
            if _err is not null then
                raise exception '% error: %', _optype, _err::json->'message'
                using detail = _err;
            end if;
            -- exit sp
            return _opid;
        end if;
        perform pg_sleep(1);
        _counter := _counter + 1;
    end loop;
    -- timed out
    raise warning 'Done waiting for %.', _optype
    using hint = 'The operation will show up in the iasql_operation table when it completes under this opid: ' || _opid;
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_cloud_manipulation (_mode iasql_operation_optype_enum) RETURNS TABLE (ACTION TEXT, table_name TEXT, id INTEGER, description TEXT) LANGUAGE plpgsql SECURITY DEFINER AS $$
declare
  _opid uuid;
begin
  _opid := until_iasql_operation(_mode, array[]::text[]);
  return query select
    j.s->>'action' as action,
    j.s->>'tableName' as table_name,
    case when j.s->>'id' = '' then null else (j.s->>'id')::integer end as id,
    j.s->>'description' as description
  from (
    select json_array_elements(output::json->'rows') as s from iasql_operation where opid = _opid
  ) as j;
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_apply () RETURNS TABLE (ACTION TEXT, table_name TEXT, id INTEGER, description TEXT) LANGUAGE plpgsql SECURITY DEFINER AS $$
begin
  return query select * from iasql_cloud_manipulation('APPLY');
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_preview_apply () RETURNS TABLE (ACTION TEXT, table_name TEXT, id INTEGER, description TEXT) LANGUAGE plpgsql SECURITY DEFINER AS $$
begin
  return query select * from iasql_cloud_manipulation('PLAN_APPLY');
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_sync () RETURNS TABLE (ACTION TEXT, table_name TEXT, id INTEGER, description TEXT) LANGUAGE plpgsql SECURITY DEFINER AS $$
begin
  return query select * from iasql_cloud_manipulation('SYNC');
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_preview_sync () RETURNS TABLE (ACTION TEXT, table_name TEXT, id INTEGER, description TEXT) LANGUAGE plpgsql SECURITY DEFINER AS $$
begin
  return query select * from iasql_cloud_manipulation('PLAN_SYNC');
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_install (VARIADIC _mods TEXT[]) RETURNS TABLE (module_name CHARACTER VARYING, created_table_name CHARACTER VARYING, record_count INT) LANGUAGE plpgsql SECURITY DEFINER AS $$
begin
    perform until_iasql_operation('INSTALL', _mods);
    return query select
        m.name as module_name,
        t.table as created_table_name,
        (xpath('/row/c/text()', query_to_xml(format('select count(*) as c from public.%I', t.table), FALSE, TRUE, '')))[1]::text::int AS record_count
    from iasql_module as m
    inner join iasql_tables as t on m.name = t.module
    inner join (select unnest(_mods) as module) as mo on true
    where left(m.name, length(mo.module)) = mo.module;
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_uninstall (VARIADIC _mods TEXT[]) RETURNS TABLE (module_name CHARACTER VARYING, dropped_table_name CHARACTER VARYING, record_count INT) LANGUAGE plpgsql SECURITY DEFINER AS $$
declare
    _db_id text;
    _dblink_conn_count int;
    _dblink_sql text;
    _out json;
begin
    select current_database() into _db_id;
    -- reuse the 'iasqlopconn' db dblink connection if one exists for the session
    -- dblink connection closes automatically at the end of a session
    SELECT count(1) INTO _dblink_conn_count FROM dblink_get_connections()
        WHERE dblink_get_connections@>'{iasqlopconn}';
    IF _dblink_conn_count = 0 THEN
        PERFORM dblink_connect('iasqlopconn', 'loopback_dblink_' || _db_id);
    END IF;
    -- define the query to get the current tables and record counts for the modules to be removed
    -- TODO: Are these hoops to encode into JSON and then decode back out necessary now that
    -- dblink is being used here, too?
    _dblink_sql := format($dblink$
    select json_agg(row_to_json(row(j.module_name, j.dropped_table_name, j.record_count))) as js from (
        select
        m.name as module_name,
        t.table as dropped_table_name,
        (xpath('/row/c/text()', query_to_xml(format('select count(*) as c from public.%%I', t.table), FALSE, TRUE, '')))[1]::text::int AS record_count
        from iasql_module as m
        inner join iasql_tables as t on m.name = t.module
        inner join (select unnest(array['%s']) as module) as mo on true
        where left(m.name, length(mo.module)) = mo.module
    ) as j;
    $dblink$, array_to_string(_mods, ''','''));
    -- Execute the query on another connection so the table access doesn't count on this
    -- transaction and cause Postgres to softlock itself
    select js into _out from dblink('iasqlopconn', _dblink_sql) as x(js json);
    -- Now actually remove the modules and tables in question
    perform until_iasql_operation('UNINSTALL', _mods);
    -- And extract the metadata from the JSON blob and return it to the user
    return query select f1 as module_name, f2 as dropped_table_name, f3 as record_count from json_to_recordset(_out) as x(f1 character varying, f2 character varying, f3 int);
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_modules_list () RETURNS TABLE (module_name TEXT, module_version TEXT, dependencies TEXT[]) LANGUAGE plpgsql SECURITY DEFINER AS $$
declare
  _opid uuid;
begin
  _opid := until_iasql_operation('LIST', array[]::text[]);
  return query select
    j.s->>'moduleName' as module_name,
    j.s->>'moduleVersion' as module_version,
    array(select * from json_array_elements_text(j.s->'dependencies')) as dependencies
  from (
    select json_array_elements(output::json) as s from iasql_operation where opid = _opid
  ) as j;
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_modules_installed () RETURNS TABLE (module_name TEXT, module_version TEXT, dependencies VARCHAR[]) LANGUAGE plpgsql SECURITY DEFINER AS $$
begin
  return query select
    split_part(name, '@', 1) as module_name,
    split_part(name, '@', 2) as module_version,
    array(select dependency from iasql_dependencies where module = name) as dependencies
  from iasql_module;
end;
$$;

CREATE
OR REPLACE FUNCTION delete_all_records () RETURNS void LANGUAGE plpgsql AS $$
DECLARE
  loop_count integer := 0;
  tables_array_length integer;
  tables_array text[];
  aux_tables_array text[];
BEGIN
  SELECT ARRAY(SELECT "table" FROM iasql_tables) INTO tables_array;
  SELECT array_length(tables_array, 1) INTO tables_array_length;
  WHILE tables_array_length > 0 AND loop_count < 20 LOOP
    SELECT tables_array INTO aux_tables_array;
    FOR table_elem IN array_lower(aux_tables_array, 1)..array_upper(aux_tables_array, 1) LOOP
      BEGIN
        EXECUTE format('DELETE FROM %I', aux_tables_array[table_elem]);
        SELECT array_remove(tables_array, aux_tables_array[table_elem]) INTO tables_array;
      EXCEPTION
        WHEN others THEN
          -- we ignore the error
        END;
    END LOOP;
    SELECT array_length(tables_array, 1) INTO tables_array_length;
    loop_count := loop_count + 1;
  END LOOP;
END;
$$;

CREATE
OR REPLACE FUNCTION iasql_upgrade () RETURNS TEXT LANGUAGE plpgsql SECURITY DEFINER AS $$
declare
  _opid uuid;
  _out text;
begin
  _opid := until_iasql_operation('UPGRADE', array[]::text[]);
  select output into _out from iasql_operation where opid = _opid;
  return _out;
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_version () RETURNS TABLE (VERSION TEXT) LANGUAGE plpgsql SECURITY DEFINER AS $$
begin
  return query select split_part(name, '@', 2) as version from iasql_module limit 1;
end;
$$;

CREATE
OR REPLACE FUNCTION iasql_help () RETURNS TABLE (NAME TEXT, signature TEXT, description TEXT, sample_usage TEXT) LANGUAGE plpgsql SECURITY DEFINER AS $$
begin
  return query select
    x.name, x.signature, x.description, x.sample_usage
  from json_to_recordset('[
    {"name": "apply", "signature": "iasql_apply()", "description": "Create, delete, or update the cloud resources in a hosted db", "sample_usage": "SELECT * FROM iasql_apply()"},
    {"name": "preview_apply", "signature": "iasql_preview_apply()", "description": "Preview of the resources in the db to be modified on the next `apply`", "sample_usage": "SELECT * FROM iasql_preview_apply()"},
    {"name": "sync", "signature": "iasql_sync()", "description": "Synchronize the hosted db with the current state of the cloud account", "sample_usage": "SELECT * FROM iasql_sync()"},
    {"name": "preview_sync", "signature": "iasql_preview_sync()", "description": "Preview of the resources in the db to be modified on the next `sync`", "sample_usage": "SELECT * FROM iasql_preview_sync()"},
    {"name": "install", "signature": "iasql_install(variadic text[])", "description": "Install modules in the hosted db", "sample_usage": "SELECT * FROM iasql_install(''aws_vpc'', ''aws_ec2'')"},
    {"name": "uninstall", "signature": "iasql_uninstall(variadic text[])", "description": "Uninstall modules in the hosted db", "sample_usage": "SELECT * FROM iasql_uninstall(''aws_vpc'', ''aws_ec2'')"},
    {"name": "modules_list", "signature": "iasql_modules_list()", "description": "Lists all modules available to be installed", "sample_usage": "SELECT * FROM iasql_modules_list()"},
    {"name": "modules_installed", "signature": "iasql_modules_installed()", "description": "Lists all modules currently installed in the hosted db", "sample_usage": "SELECT * FROM iasql_modules_installed()"},
    {"name": "upgrade", "signature": "iasql_upgrade()", "description": "Upgrades the db to the latest IaSQL Platform", "sample_usage": "SELECT iasql_upgrade()"},
    {"name": "version", "signature": "iasql_version()", "description": "Lists the currently installed IaSQL Platform version", "sample_usage": "SELECT * from iasql_version()"}
  ]') as x(name text, signature text, description text, sample_usage text);
end;
$$;
