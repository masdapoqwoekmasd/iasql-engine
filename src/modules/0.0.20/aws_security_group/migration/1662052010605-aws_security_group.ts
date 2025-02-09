import { MigrationInterface, QueryRunner } from 'typeorm';

export class awsSecurityGroup1662052010605 implements MigrationInterface {
  name = 'awsSecurityGroup1662052010605';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "security_group" ("id" SERIAL NOT NULL, "description" character varying NOT NULL, "group_name" character varying NOT NULL, "owner_id" character varying, "group_id" character varying, "vpc_id" integer, CONSTRAINT "UQ_groupNameByVpc" UNIQUE ("group_name", "vpc_id"), CONSTRAINT "PK_08670ec0c305866dbfbfe004cb8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "security_group_rule" ("id" SERIAL NOT NULL, "security_group_rule_id" character varying, "is_egress" boolean NOT NULL, "ip_protocol" character varying NOT NULL, "from_port" integer, "to_port" integer, "cidr_ipv4" cidr, "cidr_ipv6" cidr, "prefix_list_id" character varying, "description" character varying, "security_group_id" integer, CONSTRAINT "UQ_rule" UNIQUE ("is_egress", "ip_protocol", "from_port", "to_port", "cidr_ipv4", "security_group_id"), CONSTRAINT "PK_f4c5f95331113ce4a2e1978a076" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "security_group" ADD CONSTRAINT "FK_14629e5f1649053f9d33544acad" FOREIGN KEY ("vpc_id") REFERENCES "vpc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "security_group_rule" ADD CONSTRAINT "FK_aebae570368c0606123496b0f90" FOREIGN KEY ("security_group_id") REFERENCES "security_group"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "security_group_rule" DROP CONSTRAINT "FK_aebae570368c0606123496b0f90"`,
    );
    await queryRunner.query(`ALTER TABLE "security_group" DROP CONSTRAINT "FK_14629e5f1649053f9d33544acad"`);
    await queryRunner.query(`DROP TABLE "security_group_rule"`);
    await queryRunner.query(`DROP TABLE "security_group"`);
  }
}
