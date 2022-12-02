import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoffeeRefactor1669941094712 implements MigrationInterface {
  name = 'CoffeeRefactor1669941094712';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coffee" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coffee" DROP COLUMN "description"`);
  }
}
