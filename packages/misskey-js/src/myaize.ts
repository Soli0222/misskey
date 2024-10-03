/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export function myaize(text: string): string {
	return text
		// ja-JP
		.replaceAll('ま', 'みゃ').replaceAll('マ', 'ミャ').replaceAll('ﾏ', 'ﾐｬ')
		.replaceAll('みや', 'みゃ').replaceAll('ミヤ', 'ミャ').replaceAll('ﾐﾔ', 'ﾐｬ');
}
