import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateDatabase1611271209291 implements MigrationInterface {
    name = 'CreateDatabase1611271209291'

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TYPE "developers_sexo_enum" AS ENUM(\'m\', \'f\')')
      await queryRunner.query('CREATE TABLE "developers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "nome" character varying NOT NULL, "sexo" "developers_sexo_enum" NOT NULL, "idade" integer NOT NULL, "hobby" character varying NOT NULL, "datanascimento" TIMESTAMP NOT NULL, CONSTRAINT "PK_247719240b950bd26dec14bdd21" PRIMARY KEY ("id"))')
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "developers"')
      await queryRunner.query('DROP TYPE "developers_sexo_enum"')
    }
}
