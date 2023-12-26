<script lang="ts">
	import { page } from '$app/stores';
	import Block from '$lib/components/Block.svelte';
	import p from '$lib/components/TextArea.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	console.log('data', data);

	let show_pinyin = true;
	let left_panel: HTMLDivElement;
	let right_panel: HTMLDivElement;

	let story_id = $page.params.story;
</script>

<div class="flex flex-col gap-4 h-screen p-10">
	<div class="flex gap-4 items-baseline">
		<h1 class="text-2xl font-bold">{data.title_cn} ({data.title})</h1>
		<a class="underline" href="/">Go back</a>
	</div>
	<div class="flex gap-4">
		<p class="grow">{data.orig}</p>
		<div class="separator border"></div>
		<p class="grow">{data.cn}</p>
		
		<div class="grow-1 w-xl min-w-max">
			<input type="checkbox" id="show-pinyin" bind:checked={show_pinyin} />
			<label for="show-pinyin" class="whitespace-nowrap">show pinyin</label>
		</div>

	</div>
	<div class="flex gap-2  grow items-start">
		<div class="flex flex-wrap gap-1 w-3/4 items-end" bind:this={left_panel}>
			{#if data.words}
				{#each data.words as word}
					<Block {word} {show_pinyin} {story_id} highlight={$page.params.hanzi} />
				{/each}
			{/if}
		</div>

		<div class="border h-full w-1/4" bind:this={right_panel}>
			<slot />
		</div>
	</div>
</div>
