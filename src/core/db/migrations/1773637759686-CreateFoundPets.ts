import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateFoundPets1773637759686 implements MigrationInterface {
    name = 'CreateFoundPets1773637759686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "found_pet" ("id" SERIAL NOT NULL, "species" character varying NOT NULL, "breed" character varying NOT NULL, "color" character varying NOT NULL, "size" character varying NOT NULL, "description" text NOT NULL, "photo_url" character varying, "finder_name" character varying NOT NULL, "finder_email" character varying NOT NULL, "finder_phone" character varying NOT NULL, "location" geometry(Point,4326) NOT NULL, "address" character varying NOT NULL, "found_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_71a8770507298fc9e00d94f8236" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "found_pet"`);
    }

}
