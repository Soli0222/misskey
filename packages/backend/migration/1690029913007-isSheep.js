/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class IsSheep1690029913007 {
    name = 'IsSheep1690029913007'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "isSheep" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."isSheep" IS 'Whether the User is a sheep.'`);
    }

    async down(queryRunner) {
        await queryRunner.query(`COMMENT ON COLUMN "user"."isSheep" IS 'Whether the User is a sheep.'`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isSheep"`);
    }
}
