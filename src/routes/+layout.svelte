<script lang="ts">
	import '../app.css';
	// import { page } from '$app/stores';
	// import Block from '$lib/components/Block.svelte';
	// import TextArea from '$lib/components/TextArea.svelte';
	// import { onMount } from 'svelte';

	// import { original_text, chinese_text, annotated_chinese, dictionary } from '$lib/stores';

	// let annotated_chiniese_words: Word[] = [];

	// async function update_dictionary(hanzi: string[], words: Word[]) {
	// 	let new_hanzi = Array.from(hanzi).filter((h) => !(h in dictionary));

	// 	if (new_hanzi.length > 0) {
	// 		let response = await fetch('/lookup/', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify(new_hanzi)
	// 		});
	// 		let data = await response.json();

	// 		console.log('data', data);
	// 		$dictionary = { ...$dictionary, ...data };
	// 	}

	// 	console.log('Dictionary updated:', $dictionary);
	// 	console.log(Object.keys($dictionary));

	// 	return words;
	// }

  // let show_pinyin = false;

	// $: {
	// 	let { words, all_hanzi } = annotation_to_words($annotated_chinese);
	// 	update_dictionary(all_hanzi, words).then((words) => {
	// 		annotated_chiniese_words = words;
	// 	});
	// }
</script>


<slot />
