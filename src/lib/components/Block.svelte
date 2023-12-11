<script lang="ts">
	import HanziWriter from 'hanzi-writer';

	import HanziCard from './HanziCard.svelte';
	import { tone2accent, tone2class } from '$lib/utils';
	
	export let word: Word;
	
	console.log('word', word);
</script>

<div
	class="flex flex-col rounded-sm group tooltip {word.hanzi[0].pinyin
		? 'border border-black '
		: ''}"
	data-tip={word.english}
>
	<div class="flex flex-row items-center">
		{#each word.hanzi as character}
			<div class="flex flex-col items-center">
      
      <button class="dropdown">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div class="text-4xl px-1 whitespace-nowrap {tone2class(character.pinyin)}" tabindex="0">
          {character.hanzi}
        </div>
        <div class="px-1 {tone2class(character.pinyin)}">{tone2accent(character.pinyin)}</div>
					<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
					<div
						tabindex="0"
						class="dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box border border-black min-w-[20rem]"
					>
						<HanziCard {character} />
					</div>
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
