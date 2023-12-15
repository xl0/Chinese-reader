<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import Block from '$lib/components/Block.svelte';
	import TextArea from '$lib/components/TextArea.svelte';
	import { onMount } from 'svelte';

	import { original_text, chinese_text, annotated_chinese, dictionary} from '$lib/stores';


	function annotation_to_words(annotation: string) {
		// A dictionary maps a hanzi to a list of definitions.
		// let dictionary: Record<string, Definition[]> = {};

		let hanzi_set = new Set<string>();

		let words: Word[] = [];

		// The input will be a text the the following format:
		// 你好/ni3 hao3/Hello
		// ,
		// 好/hao3/Good
		// 吗/ma5/?
		// ?
		for (let line of annotation.split('\n')) {
			let parts = line.split('/');
			let hanzi = parts[0];
			let pinyin = parts.length > 1 ? parts[1] : undefined;
			let english = parts.length > 2 ? parts[2] : undefined;
			// console.log('hanzi', hanzi);
			// console.log('pinyin', pinyin);
			// console.log('english', english);

			let word: Word = { hanzi: [], english: english };

			let pinyinParts = pinyin ? pinyin.split(' ') : [];

			for (let j = 0; j < hanzi.length; j++) {
				const one_hanzi = hanzi[j];
				word.hanzi.push({ hanzi: one_hanzi, pinyin: pinyinParts[j] });
				hanzi_set.add(one_hanzi);
			}
			words.push(word);

		}
		return { words, all_hanzi: Array.from(hanzi_set) };
	}
	let annotated_chiniese_words: Word[] = [];

	async function update_dictionary(hanzi: string[], words: Word[]) {
		let new_hanzi = Array.from(hanzi).filter((h) => !(h in dictionary));

		if (new_hanzi.length > 0) {
			let response = await fetch('/lookup/', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(new_hanzi)
			});
			let data = await response.json();

			console.log('data', data);
			$dictionary = { ...$dictionary, ...data };
		}

		console.log('Dictionary updated:', $dictionary);
    console.log(Object.keys($dictionary))


    return words;
	}

	$: {
		let { words, all_hanzi } = annotation_to_words($annotated_chinese);
		update_dictionary(all_hanzi, words).then((words) => {
			annotated_chiniese_words = words;
		});
	}

</script>

<div class="flex flex-col gap-4 my-4">
	<div class="w-2/3 self-center flex items-end gap-2">
		<TextArea class="w-full" bind:value={$original_text} />
		<button class="btn btn-primary">Translate</button>
	</div>
	<div class="w-2/3 self-center flex items-end gap-2">
		<TextArea class="w-full" bind:value={$chinese_text} />
		<button class="btn btn-primary">Annotate</button>
	</div>

	<div class="w-2/3 self-center">
		<details class="collapse bg-base-200">
			<summary class="collapse-title text-xl font-medium">Raw annotated Chinese</summary>
			<div class="collapse-content">
				<TextArea class="w-full" bind:value={$annotated_chinese} />
			</div>
		</details>
	</div>

	<div class="flex flex-wrap gap-1 mx-10 w-5/6">
		{#each annotated_chiniese_words as word}
			<Block {word} />
		{/each}
	</div>
</div>

<slot />
