/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;

declare const _LANGS_: string[][];
declare const _VERSION_: string;
declare const _ENV_: string;
declare const _DEV_: boolean;
declare const _PERF_PREFIX_: string;

// for dev-mode
declare const _LANGS_FULL_: string[][];

// TagCanvas
interface Window {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	TagCanvas: any;
}
