/*
 * SPDX-FileCopyrightText: syuilo and misskey-project
 * SPDX-License-Identifier: AGPL-3.0-only
 */
 
import { userDetailed } from '../../../.storybook/fakes.js';
import MkAvatar from './MkAvatar.vue';
import type { StoryObj } from '@storybook/vue3';
const common = {
	render(args) {
		return {
			components: {
				MkAvatar,
			},
			setup() {
				return {
					args,
				};
			},
			computed: {
				props() {
					return {
						...this.args,
					};
				},
			},
			template: '<MkAvatar v-bind="props" />',
		};
	},
	args: {
		user: userDetailed(),
	},
	decorators: [
		(Story, context) => ({
			// @ts-expect-error size is for test
			template: `<div :style="{ display: 'grid', width: '${context.args.size}px', height: '${context.args.size}px' }"><story/></div>`,
		}),
	],
	parameters: {
		layout: 'centered',
	},
} satisfies StoryObj<typeof MkAvatar>;
export const ProfilePage = {
	...common,
	args: {
		...common.args,
		// @ts-expect-error size is for test
		size: 120,
		indicator: true,
	},
} satisfies StoryObj<typeof MkAvatar>;
export const ProfilePageCat = {
	...ProfilePage,
	args: {
		...ProfilePage.args,
		user: {
			...userDetailed(),
			isCat: true,
		},
	},
	parameters: {
		...ProfilePage.parameters,
		chromatic: {
			/* Your story couldn’t be captured because it exceeds our 25,000,000px limit. Its dimensions are 5,504,893x5,504,892px. Possible ways to resolve:
			 * * Separate pages into components
			 * * Minimize the number of very large elements in a story
			 */
			disableSnapshot: true,
		},
	},
} satisfies StoryObj<typeof MkAvatar>;
export const ProfilePageNoCat = {
	...ProfilePage,
	args: {
		...ProfilePage.args,
		user: {
			...userDetailed(),
			isNoCat: true,
		},
	},
	parameters: {
		...ProfilePage.parameters,
		chromatic: {
			/* Your story couldn’t be captured because it exceeds our 25,000,000px limit. Its dimensions are 5,504,893x5,504,892px. Possible ways to resolve:
			 * * Separate pages into components
			 * * Minimize the number of very large elements in a story
			 */
			disableSnapshot: true,
		},
	},
} satisfies StoryObj<typeof MkAvatar>;
export const ProfilePageSheep = {
	...ProfilePage,
	args: {
		...ProfilePage.args,
		user: {
			...userDetailed(),
			isSheep: true,
		},
	},
	parameters: {
		...ProfilePage.parameters,
		chromatic: {
			/* Your story couldn’t be captured because it exceeds our 25,000,000px limit. Its dimensions are 5,504,893x5,504,892px. Possible ways to resolve:
			 * * Separate pages into components
			 * * Minimize the number of very large elements in a story
			 */
			disableSnapshot: true,
		},
	},
} satisfies StoryObj<typeof MkAvatar>;
export const ProfilePageDsite = {
	...ProfilePage,
	args: {
		...ProfilePage.args,
		user: {
			...userDetailed(),
			isDsite: true,
		},
	},
	parameters: {
		...ProfilePage.parameters,
		chromatic: {
			/* Your story couldn’t be captured because it exceeds our 25,000,000px limit. Its dimensions are 5,504,893x5,504,892px. Possible ways to resolve:
			 * * Separate pages into components
			 * * Minimize the number of very large elements in a story
			 */
			disableSnapshot: true,
		},
	},
} satisfies StoryObj<typeof MkAvatar>;
