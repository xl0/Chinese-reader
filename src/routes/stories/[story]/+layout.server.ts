import { stories } from '$lib/stories';
import { get_components } from '$lib/utils.server';
// import { annotation_to_words } from '$lib/utils';

function annotation_to_words(annotation: string[]) {
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
			hanzi_set.add(one_hanzi);
		}
		words.push(word);
	}
	return { words, all_hanzi: Array.from(hanzi_set) };
}

export function load({ params }) {
	const story = stories[Number(params.story)];
	console.log('story', story);

	let all_hanzi = Array.from(new Set(story.story_cn));
    console.log('all_hanzi', all_hanzi);

	let all_components: string[] = [];
	for (let hanzi of all_hanzi) all_components.push(...get_components(hanzi));
	all_components = Array.from(new Set(all_components)); 

	console.log('all_components', all_components);

	let res = {
		annotation: story.story_annotation,
		components: all_components,
		orig: story.story_orig,
		cn: story.story_cn,
		title: story.title_orig,
		title_cn: story.title_cn
	};

	console.log('story res: ', JSON.stringify(res, null, 2));

	return {
		annotation: story.story_annotation,
		components: all_components,
		orig: story.story_orig,
		cn: story.story_cn,
		title: story.title_orig,
		title_cn: story.title_cn
    };
} 
