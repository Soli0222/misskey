/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export function dlsize(text: string): string {
	return text
		// ja-JP
		.replaceAll('メスガキ', 'ざぁ〜こ♡')
		.replaceAll('レイプ', '合意なし')
		.replaceAll('ロリ', 'つるぺた')
		.replaceAll('監禁', '閉じ込め')
		.replaceAll('鬼畜', '超ひどい')
		.replaceAll('逆レイプ', '逆レ')
		.replaceAll('近親相姦', '近親もの')
		.replaceAll('拷問', '責め苦')
		.replaceAll('催眠', '暗示')
		.replaceAll('獣姦', '畜えち')
		.replaceAll('洗脳', '精神支配')
		.replaceAll('痴漢', '秘密さわさわ')
		.replaceAll('調教', 'しつけ')
		.replaceAll('奴隷', '下僕')
		.replaceAll('陵辱', '屈辱')
		.replaceAll('輪姦', '回し')
		.replaceAll('蟲姦', '無視えっち')
		.replaceAll('モブ姦', 'モブおじさん')
		.replaceAll('異種姦', '異種えっち')
		.replaceAll('機械姦', '機械責め')
		.replaceAll('睡眠姦', 'すやすやえっち')
		.replaceAll('催眠音声', '暗示ボイス');
}
