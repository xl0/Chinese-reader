<script lang="ts">
	import { page } from '$app/stores';
	import Block from '$lib/components/Block.svelte';
	import LabelledText from '$lib/components/LabelledText.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import { onMount } from 'svelte';

	import { story } from '$lib/stores';

	// def split_into_words(story, simplified_dict):
	//   words = []
	//   i = 0
	//   while i < len(story):
	//       max_len_word = story[i]
	//       for j in range(min(len(story), 10)):
	//           if story[i:i+j+1] in simplified_dict:
	//               max_len_word = story[i:i+j+1]
	//       i += len(max_len_word)
	//       max_len_word = max_len_word.strip(" ")
	//       # print(f"'{max_len_word}'")
	//       if max_len_word:
	//           words.append(max_len_word)
	//   return words

	let simplified_keys = Object.keys($page.data.simplified);

	function splitIntoWords(story: string, simplifiedKeys: Array<string>) {
		let words = [];
		let i = 0;
		while (i < story.length) {
			let maxLenWord = story[i];
			for (let j = 0; j < Math.min(story.length, 10); j++) {
				let subString = story.substring(i, i + j + 1);
				if (simplifiedKeys.includes(subString)) {
					maxLenWord = subString;
				}
			}
			i += maxLenWord.length;
			maxLenWord = maxLenWord.trim();
			if (maxLenWord) {
				words.push(maxLenWord);
			}
		}
		return words;
	}

	function debounce(func: Function, delay: number) {
		let debounceTimer: number; // | NodeJS.Timeout;
		return function (...args: any[]) {
			if (debounceTimer) clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => func(...args), delay);
		};
	}

	let story_words: Array<string> = [];

	function split_story(story: string) {
    story_words = splitIntoWords(story, simplified_keys);
  }

	$: debounce(split_story, 1000)($story);
</script>

<div class="div flex flex-col">
	<TextArea class="w-2/3 self-center" bind:value={$story} />

	<div class="flex flex-wrap gap-1">
		{#each story_words as word}
				<Block value={word} metadata={$page.data.simplified[word]} />
		{/each}
	</div>
</div>

<!-- <LabelledText value="sdfsf"/> -->
