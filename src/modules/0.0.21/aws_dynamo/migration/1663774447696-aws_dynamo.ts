import { MigrationInterface, QueryRunner } from 'typeorm';

export class awsDynamo1663774447696 implements MigrationInterface {
  name = 'awsDynamo1663774447696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."dynamo_table_table_class_enum" AS ENUM('STANDARD', 'STANDARD_INFREQUENT_ACCESS')`,
    );
    await queryRunner.query(
      `CREATE TABLE "dynamo_table" ("id" SERIAL NOT NULL, "table_name" character varying NOT NULL, "table_class" "public"."dynamo_table_table_class_enum" NOT NULL, "throughput" json NOT NULL, "table_id" character varying, "primary_key" json NOT NULL, "created_at" TIMESTAMP, "region" character varying NOT NULL DEFAULT default_aws_region(), CONSTRAINT "PK_d88faa91b7a7a9cb17ee75e576b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "dynamo_table"`);
    await queryRunner.query(`DROP TYPE "public"."dynamo_table_table_class_enum"`);
  }
}
