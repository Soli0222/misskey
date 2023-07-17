export class IsSheep1685973840000 {
    name = 'IsSheep1685973840000'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "isSheep" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isSheep"`);
    }
}