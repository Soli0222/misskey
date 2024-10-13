/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class isNoCat1728787821440 {
	name = 'isNoCat1728787821440'

	async up(queryRunner) {
		await queryRunner.query(`ALTER TABLE "user" ADD "isNoCat" boolean NOT NULL DEFAULT false`);
		await queryRunner.query(`COMMENT ON COLUMN "user"."isNoCat" IS 'Whether the User is a sheep.'`);
}

async down(queryRunner) {
		await queryRunner.query(`COMMENT ON COLUMN "user"."isNoCat" IS 'Whether the User is a sheep.'`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isNoCat"`);
}
}
