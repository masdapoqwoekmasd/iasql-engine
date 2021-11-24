import {MigrationInterface, QueryRunner} from "typeorm";

export class awsElb1637666608609 implements MigrationInterface {
    name = 'awsElb1637666608609'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."aws_load_balancer_scheme_enum" AS ENUM('internal', 'internet-facing')`);
        await queryRunner.query(`CREATE TYPE "public"."aws_load_balancer_state_enum" AS ENUM('active', 'active_impaired', 'failed', 'provisioning')`);
        await queryRunner.query(`CREATE TYPE "public"."aws_load_balancer_load_balancer_type_enum" AS ENUM('application', 'gateway', 'network')`);
        await queryRunner.query(`CREATE TYPE "public"."aws_load_balancer_ip_address_type_enum" AS ENUM('dualstack', 'ipv4')`);
        await queryRunner.query(`CREATE TABLE "aws_load_balancer" ("id" SERIAL NOT NULL, "load_balancer_name" character varying NOT NULL, "load_balancer_arn" character varying, "dns_name" character varying, "canonical_hosted_zone_id" character varying, "created_time" TIMESTAMP WITH TIME ZONE, "scheme" "public"."aws_load_balancer_scheme_enum" NOT NULL, "state" "public"."aws_load_balancer_state_enum", "load_balancer_type" "public"."aws_load_balancer_load_balancer_type_enum" NOT NULL, "ip_address_type" "public"."aws_load_balancer_ip_address_type_enum" NOT NULL, "customer_owned_ipv4_pool" character varying, "vpc_id" integer, CONSTRAINT "UQ_0da1f9c4e655b7b4b433e8e91d1" UNIQUE ("load_balancer_name"), CONSTRAINT "PK_8ae32084dac3c544fe7642f732e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."aws_target_group_target_type_enum" AS ENUM('alb', 'instance', 'ip', 'lambda')`);
        await queryRunner.query(`CREATE TYPE "public"."aws_target_group_ip_address_type_enum" AS ENUM('ipv4', 'ipv6')`);
        await queryRunner.query(`CREATE TYPE "public"."aws_target_group_protocol_enum" AS ENUM('GENEVE', 'HTTP', 'HTTPS', 'TCP', 'TCP_UDP', 'TLS', 'UDP')`);
        await queryRunner.query(`CREATE TYPE "public"."aws_target_group_health_check_protocol_enum" AS ENUM('GENEVE', 'HTTP', 'HTTPS', 'TCP', 'TCP_UDP', 'TLS', 'UDP')`);
        await queryRunner.query(`CREATE TYPE "public"."aws_target_group_protocol_version_enum" AS ENUM('GRPC', 'HTTP1', 'HTTP2')`);
        await queryRunner.query(`CREATE TABLE "aws_target_group" ("id" SERIAL NOT NULL, "target_group_name" character varying NOT NULL, "target_type" "public"."aws_target_group_target_type_enum" NOT NULL, "target_group_arn" character varying, "ip_address_type" "public"."aws_target_group_ip_address_type_enum", "protocol" "public"."aws_target_group_protocol_enum", "port" integer, "health_check_protocol" "public"."aws_target_group_health_check_protocol_enum", "health_check_port" character varying, "health_check_enabled" boolean, "health_check_interval_seconds" integer, "health_check_timeout_seconds" integer, "healthy_threshold_count" integer, "unhealthy_threshold_count" integer, "health_check_path" character varying, "protocol_version" "public"."aws_target_group_protocol_version_enum", "vpc_id" integer, CONSTRAINT "UQ_cf9961c536580e0ac69ab777cd9" UNIQUE ("target_group_name"), CONSTRAINT "PK_0b8e2cf0848ed04023306981d2a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."aws_listener_protocol_enum" AS ENUM('GENEVE', 'HTTP', 'HTTPS', 'TCP', 'TCP_UDP', 'TLS', 'UDP')`);
        await queryRunner.query(`CREATE TABLE "aws_listener" ("id" SERIAL NOT NULL, "listener_arn" character varying, "port" integer NOT NULL, "protocol" "public"."aws_listener_protocol_enum" NOT NULL, "aws_load_balancer_id" integer NOT NULL, CONSTRAINT "PK_0a7c3e7b90e9d66f7b4415a0e0b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."aws_action_action_type_enum" AS ENUM('forward')`);
        await queryRunner.query(`CREATE TABLE "aws_action" ("id" SERIAL NOT NULL, "action_type" "public"."aws_action_action_type_enum" NOT NULL, "target_group_id" integer NOT NULL, CONSTRAINT "PK_1788d4975e1ae1475268e0e10fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "aws_load_balancer_subnets_aws_subnet" ("aws_load_balancer_id" integer NOT NULL, "aws_subnet_id" integer NOT NULL, CONSTRAINT "PK_103627c331bc977e2b5d1c3bfc2" PRIMARY KEY ("aws_load_balancer_id", "aws_subnet_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a641a96031b6e2b3ae4e231c41" ON "aws_load_balancer_subnets_aws_subnet" ("aws_load_balancer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_41d65e026247125582194e9a6f" ON "aws_load_balancer_subnets_aws_subnet" ("aws_subnet_id") `);
        await queryRunner.query(`CREATE TABLE "aws_load_balancer_availability_zones_availability_zone" ("aws_load_balancer_id" integer NOT NULL, "availability_zone_id" integer NOT NULL, CONSTRAINT "PK_e899fbd6d9548ddd91dfb73b1d1" PRIMARY KEY ("aws_load_balancer_id", "availability_zone_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d4267dfad94c92a741325a4f52" ON "aws_load_balancer_availability_zones_availability_zone" ("aws_load_balancer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_a9bfcd14668baba48752465f6a" ON "aws_load_balancer_availability_zones_availability_zone" ("availability_zone_id") `);
        await queryRunner.query(`CREATE TABLE "aws_load_balancer_security_groups_aws_security_group" ("aws_load_balancer_id" integer NOT NULL, "aws_security_group_id" integer NOT NULL, CONSTRAINT "PK_c2465e5cc8f23e767297c8cdd24" PRIMARY KEY ("aws_load_balancer_id", "aws_security_group_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fea480224323d1070588595411" ON "aws_load_balancer_security_groups_aws_security_group" ("aws_load_balancer_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_db1c32e5ebacdf20b2ffad7a37" ON "aws_load_balancer_security_groups_aws_security_group" ("aws_security_group_id") `);
        await queryRunner.query(`CREATE TABLE "aws_listener_default_actions_aws_action" ("aws_listener_id" integer NOT NULL, "aws_action_id" integer NOT NULL, CONSTRAINT "PK_0d075d6702cfbbc3952e83f0025" PRIMARY KEY ("aws_listener_id", "aws_action_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d8aa3feff946c2b366fad035de" ON "aws_listener_default_actions_aws_action" ("aws_listener_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_3a5ce81218da8536275396ca4d" ON "aws_listener_default_actions_aws_action" ("aws_action_id") `);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer" ADD CONSTRAINT "FK_5666af9c322a36e851695d546d6" FOREIGN KEY ("vpc_id") REFERENCES "aws_vpc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aws_target_group" ADD CONSTRAINT "FK_599bbcc178e75ce9dd8bc5c2a41" FOREIGN KEY ("vpc_id") REFERENCES "aws_vpc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aws_listener" ADD CONSTRAINT "FK_91d0165bf0d56cc965ff5b90a43" FOREIGN KEY ("aws_load_balancer_id") REFERENCES "aws_load_balancer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aws_action" ADD CONSTRAINT "FK_94ce7359689120bff0c21ea6022" FOREIGN KEY ("target_group_id") REFERENCES "aws_target_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_subnets_aws_subnet" ADD CONSTRAINT "FK_a641a96031b6e2b3ae4e231c41d" FOREIGN KEY ("aws_load_balancer_id") REFERENCES "aws_load_balancer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_subnets_aws_subnet" ADD CONSTRAINT "FK_41d65e026247125582194e9a6fb" FOREIGN KEY ("aws_subnet_id") REFERENCES "aws_subnet"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_availability_zones_availability_zone" ADD CONSTRAINT "FK_d4267dfad94c92a741325a4f52b" FOREIGN KEY ("aws_load_balancer_id") REFERENCES "aws_load_balancer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_availability_zones_availability_zone" ADD CONSTRAINT "FK_a9bfcd14668baba48752465f6a8" FOREIGN KEY ("availability_zone_id") REFERENCES "availability_zone"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_security_groups_aws_security_group" ADD CONSTRAINT "FK_fea480224323d10705885954110" FOREIGN KEY ("aws_load_balancer_id") REFERENCES "aws_load_balancer"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_security_groups_aws_security_group" ADD CONSTRAINT "FK_db1c32e5ebacdf20b2ffad7a37a" FOREIGN KEY ("aws_security_group_id") REFERENCES "aws_security_group"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aws_listener_default_actions_aws_action" ADD CONSTRAINT "FK_d8aa3feff946c2b366fad035de1" FOREIGN KEY ("aws_listener_id") REFERENCES "aws_listener"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "aws_listener_default_actions_aws_action" ADD CONSTRAINT "FK_3a5ce81218da8536275396ca4d9" FOREIGN KEY ("aws_action_id") REFERENCES "aws_action"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        // Example of use: call create_aws_load_balancer('test-sp2', 'internal', 'vpc-41895538', 'network', array['subnet-68312820', 'subnet-a58a84c3'], 'ipv4');
        await queryRunner.query(`
            create or replace procedure create_aws_load_balancer(
                _name text,
                _scheme aws_load_balancer_scheme_enum,
                _vpc_id text,
                _elb_type aws_load_balancer_load_balancer_type_enum,
                _subnet_ids text [],
                _ip_address_type aws_load_balancer_ip_address_type_enum,
                _security_group_names text [] default null
            )
            language plpgsql
            as $$
            declare
                elb_vpc_id integer;
                aux_az_id integer;
                az record;
                az_id integer;
                sn record;
                sn_id integer;
                sg record;
                sg_id integer;
                load_balancer_id integer;
            begin
                select id into elb_vpc_id
                from aws_vpc
                where vpc_id = _vpc_id
                order by id desc
                limit 1;
            
                insert into aws_load_balancer
                    (load_balancer_name, scheme, vpc_id, load_balancer_type, ip_address_type)
                values
                    (_name, _scheme, elb_vpc_id, _elb_type, _ip_address_type)
                on conflict (load_balancer_name)
                do nothing;
            
                select id into load_balancer_id
                from aws_load_balancer
                where load_balancer_name = _name
                order by id desc
                limit 1;
            
                select aws_subnet_id into sn_id
                from aws_load_balancer_subnets_aws_subnet
                where aws_load_balancer_id = load_balancer_id
                limit 1;
            
                if sn_id is null then
                    for sn in
                        select id
                        from aws_subnet
                        where subnet_id = any(_subnet_ids)
                    loop
                        insert into aws_load_balancer_subnets_aws_subnet
                            (aws_load_balancer_id, aws_subnet_id)
                        values
                            (load_balancer_id, sn.id);
                    end loop;
                end if;
            
                select availability_zone_id into az_id
                from aws_load_balancer_availability_zones_availability_zone
                where aws_load_balancer_id = load_balancer_id
                limit 1;
            
                if az_id is null then
                    for az in
                        select id
                        from availability_zone
                        where id in (
                            select availability_zone_id
                            from aws_subnet
                            where subnet_id = any(_subnet_ids)
                        )
                    loop
                        insert into aws_load_balancer_availability_zones_availability_zone
                            (aws_load_balancer_id, availability_zone_id)
                        values
                            (load_balancer_id, az.id);
                    end loop;
                end if;
            
                select aws_security_group_id into sg_id
                from aws_load_balancer_security_groups_aws_security_group
                where aws_load_balancer_id = load_balancer_id
                limit 1;
            
                if sg_id is null then
                    for sg in
                        select id
                        from aws_security_group
                        where group_name = any(_security_group_names)
                    loop
                        insert into aws_load_balancer_security_groups_aws_security_group
                            (aws_load_balancer_id, aws_security_group_id)
                        values
                            (load_balancer_id, sg.id);
                    end loop;
                end if;
            
                raise info 'aws_load_balancer_id = %', load_balancer_id;
            end;
            $$;
        `);
        // Example of use: call create_aws_target_group('test-sp2', 'ip', 8888, 'vpc-41895538', 'TCP');
        await queryRunner.query(`
            create or replace procedure create_aws_target_group(
                _name text,
                _target_type aws_target_group_target_type_enum,
                _port integer,
                _vpc_id text,
                _protocol aws_target_group_protocol_enum
            )
            language plpgsql
            as $$
            declare 
                tg_vpc_id integer;
                target_group_id integer;
            begin
                select id into tg_vpc_id
                from aws_vpc
                where vpc_id = _vpc_id
                order by id desc
                limit 1;
            
                insert into aws_target_group
                    (target_group_name, target_type, protocol, port, vpc_id)
                values
                    (_name, _target_type, _protocol, _port, tg_vpc_id)
                on conflict (target_group_name)
                do nothing;
            
                select id into target_group_id
                from aws_target_group
                where target_group_name = _name
                order by id desc
                limit 1;
            
                raise info 'aws_target_group_id = %', target_group_id;
            end;
            $$;
        `);
        // Example of use: call create_aws_listener('test-sp2', 8888, 'TCP', 'forward', 'test-sp2');
        await queryRunner.query(`
            create or replace procedure create_aws_listener(
                _load_balancer_name text,
                _port integer,
                _protocol aws_listener_protocol_enum,
                _action_type aws_action_action_type_enum,
                _target_group_name text
            )
            language plpgsql
            as $$
            declare
                a_id integer;
                l_id integer;
                lb_id integer;
                tg_id integer;
            begin
                select id into tg_id
                from aws_target_group
                where target_group_name = _target_group_name;
            
                insert into aws_action
                    (action_type, target_group_id)
                select  _action_type, tg_id    
                where tg_id not in (
                    select target_group_id
                    from aws_action
                    where target_group_id = tg_id and action_type = _action_type
                );
            
                select id into a_id
                from aws_action
                where target_group_id = tg_id and action_type = _action_type
                order by id desc
                limit 1;
            
                select id into lb_id
                from aws_load_balancer
                where load_balancer_name = _load_balancer_name
                limit 1;
            
                select id into l_id
                from aws_listener
                where aws_load_balancer_id = lb_id and port = _port and protocol = _protocol
                order by id desc
                limit 1;
            
                if l_id is null then
                    insert into aws_listener
                        (aws_load_balancer_id, port, protocol)
                    values 
                        (lb_id, _port, _protocol);
            
                    select id into l_id
                    from aws_listener
                    order by id desc
                    limit 1;
            
                    insert into aws_listener_default_actions_aws_action
                        (aws_listener_id, aws_action_id)
                    values 
                        (lb_id, a_id);
                end if;
            
                raise info 'aws_listener_id = %', l_id;
            end; 
            $$;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP procedure create_aws_listener;`);
        await queryRunner.query(`DROP procedure create_aws_target_group;`);
        await queryRunner.query(`DROP procedure create_aws_load_balancer;`);
        await queryRunner.query(`ALTER TABLE "aws_listener_default_actions_aws_action" DROP CONSTRAINT "FK_3a5ce81218da8536275396ca4d9"`);
        await queryRunner.query(`ALTER TABLE "aws_listener_default_actions_aws_action" DROP CONSTRAINT "FK_d8aa3feff946c2b366fad035de1"`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_security_groups_aws_security_group" DROP CONSTRAINT "FK_db1c32e5ebacdf20b2ffad7a37a"`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_security_groups_aws_security_group" DROP CONSTRAINT "FK_fea480224323d10705885954110"`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_availability_zones_availability_zone" DROP CONSTRAINT "FK_a9bfcd14668baba48752465f6a8"`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_availability_zones_availability_zone" DROP CONSTRAINT "FK_d4267dfad94c92a741325a4f52b"`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_subnets_aws_subnet" DROP CONSTRAINT "FK_41d65e026247125582194e9a6fb"`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer_subnets_aws_subnet" DROP CONSTRAINT "FK_a641a96031b6e2b3ae4e231c41d"`);
        await queryRunner.query(`ALTER TABLE "aws_action" DROP CONSTRAINT "FK_94ce7359689120bff0c21ea6022"`);
        await queryRunner.query(`ALTER TABLE "aws_listener" DROP CONSTRAINT "FK_91d0165bf0d56cc965ff5b90a43"`);
        await queryRunner.query(`ALTER TABLE "aws_target_group" DROP CONSTRAINT "FK_599bbcc178e75ce9dd8bc5c2a41"`);
        await queryRunner.query(`ALTER TABLE "aws_load_balancer" DROP CONSTRAINT "FK_5666af9c322a36e851695d546d6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3a5ce81218da8536275396ca4d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d8aa3feff946c2b366fad035de"`);
        await queryRunner.query(`DROP TABLE "aws_listener_default_actions_aws_action"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db1c32e5ebacdf20b2ffad7a37"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fea480224323d1070588595411"`);
        await queryRunner.query(`DROP TABLE "aws_load_balancer_security_groups_aws_security_group"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a9bfcd14668baba48752465f6a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d4267dfad94c92a741325a4f52"`);
        await queryRunner.query(`DROP TABLE "aws_load_balancer_availability_zones_availability_zone"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_41d65e026247125582194e9a6f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a641a96031b6e2b3ae4e231c41"`);
        await queryRunner.query(`DROP TABLE "aws_load_balancer_subnets_aws_subnet"`);
        await queryRunner.query(`DROP TABLE "aws_action"`);
        await queryRunner.query(`DROP TYPE "public"."aws_action_action_type_enum"`);
        await queryRunner.query(`DROP TABLE "aws_listener"`);
        await queryRunner.query(`DROP TYPE "public"."aws_listener_protocol_enum"`);
        await queryRunner.query(`DROP TABLE "aws_target_group"`);
        await queryRunner.query(`DROP TYPE "public"."aws_target_group_protocol_version_enum"`);
        await queryRunner.query(`DROP TYPE "public"."aws_target_group_health_check_protocol_enum"`);
        await queryRunner.query(`DROP TYPE "public"."aws_target_group_protocol_enum"`);
        await queryRunner.query(`DROP TYPE "public"."aws_target_group_ip_address_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."aws_target_group_target_type_enum"`);
        await queryRunner.query(`DROP TABLE "aws_load_balancer"`);
        await queryRunner.query(`DROP TYPE "public"."aws_load_balancer_ip_address_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."aws_load_balancer_load_balancer_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."aws_load_balancer_state_enum"`);
        await queryRunner.query(`DROP TYPE "public"."aws_load_balancer_scheme_enum"`);
    }

}