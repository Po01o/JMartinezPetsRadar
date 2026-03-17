import { MigrationInterface, QueryRunner } from "typeorm";

export class NullableFounPetBreed1773638134202 implements MigrationInterface {
    name = 'NullableFounPetBreed1773638134202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "found_pet" ALTER COLUMN "breed" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "found_pet" ALTER COLUMN "breed" SET NOT NULL`);
    }

}
