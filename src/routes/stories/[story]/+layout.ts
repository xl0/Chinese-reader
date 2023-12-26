import { dictionary, strokes } from '$lib/stores';
import type { LayoutLoad } from './$types';

function annotation_to_words(annotation: string[]) {
	// A dictionary maps a hanzi to a list of definitions.
	// let dictionary: Record<string, Definition[]> = {};

	let all_hanzi = new Set<string>();

	let words: Word[] = [];

	// The input will be a text the the following format:
	// 你好/ni3 hao3/Hello
	// ,
	// 好/hao3/Good
	// 吗/ma5/?
	// ?
	for (let line of annotation) {
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
			all_hanzi.add(one_hanzi);
		}
		words.push(word);
	}
	return { words, all_hanzi: Array.from(all_hanzi) };
}

async function populate_dictionary(all_hanzi: string[], fetch: any) {
	let tmp: Record<string, DictEntry> = {};
	let unsub = dictionary.subscribe((x) => (tmp = x));
	unsub();

	let new_hanzi = all_hanzi.filter((hanzi) => !(hanzi in tmp));
	console.log('new_hanzi', new_hanzi);
	if (!new_hanzi.length) return;

	const res = await fetch('/dictionary/', {
		method: 'POST',
		body: JSON.stringify(new_hanzi)
	});
	const dict_entries = (await res.json()) as Record<string, DictEntry>;
	console.log('populate_dictionary got from lookup:', dict_entries);
	dictionary.set({ ...tmp, ...dict_entries });
}

async function populate_strokes(all_components: string[], fetch: any) {
	let tmp: Record<string, any> = {};
	let unsub = strokes.subscribe((x) => (tmp = x));
	unsub();

	let new_components = all_components.filter((component) => !(component in tmp));
	console.log('new_components', new_components);
	if (!new_components.length) return;

	const res = await fetch('/strokes/', {
		method: 'POST',
		body: JSON.stringify(new_components)
	});
	const new_strokes = (await res.json()) as Record<string, any>;
	console.log('populate_strokes got from strokes:', new_strokes);

	strokes.set({ ...tmp, ...new_strokes });
}

export const load = (async ({ data, fetch }) => {
	console.log('layout, data from server', data);

	if (!(typeof window === 'undefined') && data.annotation) {
		let { words, all_hanzi } = annotation_to_words(data.annotation);
		let all_hanzi_plus_components = Array.from(new Set(all_hanzi.concat(data.components)))
        // let all_hanzi_plus_components = all_hanzi;

		let p1 = populate_dictionary(all_hanzi_plus_components, fetch);
		let p2 = populate_strokes(all_hanzi_plus_components, fetch);

		await Promise.all([p1, p2]);
		return { ...data, words };
	}

	return {...data};
}) satisfies LayoutLoad;
