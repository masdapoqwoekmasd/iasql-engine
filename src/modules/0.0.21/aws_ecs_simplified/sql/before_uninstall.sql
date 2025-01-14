DROP TRIGGER
  insert_ecs_simplified_trigger ON ecs_simplified;

DROP FUNCTION
  insert_ecs_simplified_trigger;

DROP FUNCTION
  insert_ecs_simplified;

DROP TRIGGER
  delete_ecs_simplified_trigger ON ecs_simplified;

DROP FUNCTION
  delete_ecs_simplified_trigger;

DROP FUNCTION
  delete_ecs_simplified;

DROP TRIGGER
  update_ecs_simplified_trigger ON ecs_simplified;

DROP FUNCTION
  update_ecs_simplified_trigger;

DROP TRIGGER
  ecs_simplified_service_trigger ON service;

DROP TRIGGER
  ecs_simplified_repo_trigger ON repository;

DROP TRIGGER
  ecs_simplified_td_trigger ON task_definition;

DROP TRIGGER
  ecs_simplified_cd_trigger ON container_definition;

DROP TRIGGER
  ecs_simplified_tg_trigger ON target_group;

DROP TRIGGER
  ecs_simplified_lb_trigger ON load_balancer;

DROP TRIGGER
  ecs_simplified_listener_trigger ON listener;

DROP TRIGGER
  ecs_simplified_sg_trigger ON security_group;

DROP TRIGGER
  ecs_simplified_sg_rule_trigger ON security_group_rule;

DROP TRIGGER
  ecs_simplified_service_sg_trigger ON service_security_groups;

DROP TRIGGER
  ecs_simplified_lb_sg_trigger ON load_balancer_security_groups;

DROP FUNCTION
  sync_ecs_simplified;

DROP FUNCTION
  get_mem_from_cpu_mem_enum;

DROP FUNCTION
  get_cpu_mem_enum_from_parts;
