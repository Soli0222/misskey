/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export class IsDsite1711454117507 {
    name = 'IsDsite1711454117507'

		async up(queryRunner) {
			await queryRunner.query(`ALTER TABLE "user" ADD "isDsite" boolean NOT NULL DEFAULT false`);
			await queryRunner.query(`COMMENT ON COLUMN "user"."isDsite" IS 'Whether the User is a dsite.'`);
	}

	async down(queryRunner) {
			await queryRunner.query(`COMMENT ON COLUMN "user"."isDsite" IS 'Whether the User is a dsite.'`);
			await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isDsite"`);
	}
}
