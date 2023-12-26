<script lang="ts">
	import HanziWriter from 'hanzi-writer';


	import { tone2accent, tone2class } from '$lib/utils';

	export let word: Word;
	export let show_pinyin: boolean;
	export let story_id: string;
</script>

<div
	class="flex flex-col h-fit rounded-sm group tooltip {word.hanzi[0].pinyin
		? 'border border-black '
		: ''}"
	data-tip={word.english}
>
	<div class="flex flex-row items-center">
		{#each word.hanzi as character}
			<div class="flex flex-col items-center">
				<button class="dropdown">
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<a
						class="text-4xl px-1 whitespace-nowrap {tone2class(character.pinyin)}"
						tabindex="0"
						href="/stories/{story_id}/{character.hanzi}"
					>
						{character.hanzi}
					</a>

					{#if show_pinyin}
						<div class="px-1 {tone2class(character.pinyin)}">{tone2accent(character.pinyin)}</div>
					{:else}
						<div class="px-1 invisible">{tone2accent(character.pinyin)}</div>
					{/if}

				</button>
			</div>
		{/each}
	</div>
</div>

<style>
	.tone1 {
		color: #c04747;
	}
	.tone2 {
		color: #cfa422;
	}
	.tone3 {
		color: #1a9418;
	}
	.tone4 {
		color: #897ced;
	}
</style>
