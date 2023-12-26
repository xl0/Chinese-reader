<script lang="ts">
	import { page } from '$app/stores';
	import Block from '$lib/components/Block.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('data', data);

	let show_pinyin = true;
	let left_panel: HTMLDivElement;
	let right_panel: HTMLDivElement;

	let story_id = $page.params.story;

</script>

<div class="flex flex-col gap-4 h-screen">
	<div class="w-2/3 self-center flex items-end gap-2">
		<TextArea class="w-full" bind:value={data.orig} />
		<button class="btn btn-primary">Translate</button>
	</div>
	<div class="w-2/3 self-center flex items-end gap-2">
		<TextArea class="w-full" bind:value={data.cn} />
		<button class="btn btn-primary">Annotate</button>
	</div>

	<div class="w-2/3 self-center flex gap-2 items-end">
		<details class="collapse bg-base-200">
			<summary class="collapse-title text-xl font-medium">Raw annotated Chinese</summary>
			<div class="collapse-content">
				<TextArea class="w-full" value={data.annotation.join('\n')} />
			</div>
		</details>
		<div class="grow-1 w-xl min-w-max">
			<input type="checkbox" id="show-pinyin" bind:checked={show_pinyin} />
			<label for="show-pinyin" class="whitespace-nowrap">show pinyin</label>
		</div>
	</div>

	<div class="flex gap-2 items-stretch grow border border-red-500">
		<div class="flex flex-wrap gap-1 mx-10 w-2/3" bind:this={left_panel}>
			{#if data.words}
				{#each data.words as word}
					<Block {word} {show_pinyin} {story_id} highlight={$page.params.hanzi} />
				{/each}
			{/if}
		</div>

		<div class="border w-1/3" bind:this={right_panel}>
			<slot />
		</div>
	</div>
</div>
