<!--
SPDX-FileCopyrightText: syuilo and misskey-project
SPDX-License-Identifier: AGPL-3.0-only
-->

<template>
<div data-cy-mkw-button class="mkw-button">
	<MkButton :primary="widgetProps.colored" full @click="run">
		{{ widgetProps.label }}
	</MkButton>
</div>
</template>

<script lang="ts" setup>
import { useWidgetPropsManager } from './widget.js';
import type { WidgetComponentEmits, WidgetComponentExpose, WidgetComponentProps } from './widget.js';
import type { GetFormResultType } from '@/utility/form.js';
import MkButton from '@/components/MkButton.vue';

const name = 'spn';

const widgetPropsDef = {
	label: {
		type: 'string' as const,
		default: 'Spotify NowPlaying',
	},
	colored: {
		type: 'boolean' as const,
		default: true,
	},
};

type WidgetProps = GetFormResultType<typeof widgetPropsDef>;

const props = defineProps<WidgetComponentProps<WidgetProps>>();
const emit = defineEmits<WidgetComponentEmits<WidgetProps>>();

const { widgetProps, configure } = useWidgetPropsManager(name,
	widgetPropsDef,
	props,
	emit,
);

const run = async () => {
	let openSpn = window.open('https://spn.soli0222.com/note');
};

defineExpose<WidgetComponentExpose>({
	name,
	configure,
	id: props.widget ? props.widget.id : null,
});
</script>
