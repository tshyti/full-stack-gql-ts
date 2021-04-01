import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1617265078757 implements MigrationInterface {
	name = 'InitialMigration1617265078757';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE "public"."UsersRoles" ("UserId" integer NOT NULL, "RoleCode" text NOT NULL, "CreatedOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_32a3abe622e5526638183f3f75d" PRIMARY KEY ("UserId", "RoleCode"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "users_roles_pk" ON "public"."UsersRoles" ("RoleCode", "UserId") `
		);
		await queryRunner.query(
			`CREATE TABLE "public"."Users" ("CreatedOn" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "Email" text NOT NULL, "Firstname" text, "Id" SERIAL NOT NULL, "Lastname" text, "Passsword" text NOT NULL, CONSTRAINT "PK_9993f626389fd98c92ce766e5b3" PRIMARY KEY ("Id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "Users_pkey" ON "public"."Users" ("Id") `
		);
		await queryRunner.query(
			`CREATE TABLE "public"."Roles" ("Id" SERIAL NOT NULL, "Code" text NOT NULL, "Name" text NOT NULL, CONSTRAINT "PK_52a1689b73f3c581bcd1a6e5355" PRIMARY KEY ("Id"))`
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "Roles_pkey" ON "public"."Roles" ("Id") `
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX "Roles_code" ON "public"."Roles" ("Code") `
		);
		await queryRunner.query(
			`ALTER TABLE "public"."UsersRoles" ADD CONSTRAINT "FK_3782d99e3ebd3c82d5ac421a41b" FOREIGN KEY ("RoleCode") REFERENCES "public"."Roles"("Code") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."UsersRoles" ADD CONSTRAINT "FK_a89d8dc2ccec7a9968f8022310b" FOREIGN KEY ("UserId") REFERENCES "public"."Users"("Id") ON DELETE NO ACTION ON UPDATE NO ACTION`
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE "public"."UsersRoles" DROP CONSTRAINT "FK_a89d8dc2ccec7a9968f8022310b"`
		);
		await queryRunner.query(
			`ALTER TABLE "public"."UsersRoles" DROP CONSTRAINT "FK_3782d99e3ebd3c82d5ac421a41b"`
		);
		await queryRunner.query(`DROP INDEX "public"."Roles_pkey"`);
		await queryRunner.query(`DROP TABLE "public"."Roles"`);
		await queryRunner.query(`DROP INDEX "public"."Users_pkey"`);
		await queryRunner.query(`DROP TABLE "public"."Users"`);
		await queryRunner.query(`DROP INDEX "public"."users_roles_pk"`);
		await queryRunner.query(`DROP TABLE "public"."UsersRoles"`);
	}
}
