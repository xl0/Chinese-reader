import type { RequestHandler } from './$types';

import * as hanzi from 'hanzi';

declare global {
	interface NodeJS {
		Global: {
			isHanziStarted: boolean;
		};
	}
}

if (!global.isHanziStarted) {
	hanzi.start();
	global.isHanziStarted = true;
}
// export const load = (async ({ params }) => {
// 	console.log('hanzi', params.hanzi);
// 	// if (hanzi.ifComponentExists(params.hanzi)) {
// 	const decomposition = hanzi.decompose(params.hanzi);
// 	console.log('decomposition', decomposition);
// 	const defitions = hanzi.definitionLookup(params.hanzi);
// 	console.log('defitions', defitions);

// 	return { hanzi: params.hanzi, decomposition, definitions: defitions };
// 	// }

// 	// return;
// }) satisfies PageServerLoad;

function populate_dictionary(item: string, dictionary: Record<string, DictEntry>) {
    console.log('populate_dictionary', item);
	const defitions = hanzi.definitionLookup(item);
	console.log('defitions', defitions);
	const decomponsition = hanzi.decompose(item);
	console.log('decomponse', decomponsition);
	let radical = hanzi.getRadicalMeaning(item);
    radical = radical != "N/A" ? radical : undefined;
    console.log('radical', radical);

	dictionary[item] = {
		definitions: defitions,
		decomposition: decomponsition,
		radical_definition: radical
	};
	for (let conponent of decomponsition.components1) {
		console.log('conponent', conponent);
		if (!dictionary[conponent]) {
			dictionary = populate_dictionary(conponent, dictionary);
		}
	}

	// for (let conponent in decomponsition.components2) {
	// 	if (!dictionary[conponent]) populate_dictionary(conponent, dictionary);
	// }

	return dictionary;
}

export const POST: RequestHandler = async ({ request }) => {
	const res = await request.json();
	const items: string[] = res;

	console.log('POST lookup', items);

	let dictionary: Record<string, DictEntry> = {};

	for (let item of items) {
		populate_dictionary(item, dictionary);
		// const defitions = hanzi.definitionLookup(item);
		// console.log('defitions', defitions);
		// const decomponsition  = hanzi.decompose(item);
		// console.log('decomponse', decomponsition);
		// const radical = hanzi.getRadicalMeaning(item);

		// dictionary[item] = {
		//     definitions: defitions,
		//     decomposition: decomponsition,
		//     radical_definition: radical
		// }

		// 	for (let character of word.hanzi) {
		// 		// const decomposition  = hanzi.decompose(character.hanzi);
		// 		// console.log('decomponse', decomposition);
		// 		const defitions = hanzi.definitionLookup(character.hanzi);
		// 		console.log('defitions', defitions);
		// 		if (!defitions) continue;
		// 		character.definitions = defitions;

		// 		// character.decomposition = decomposition;
		// 		// character.definitions = defitions;
	}

	// console.log('word', word);
	// const defitions = hanzi.definitionLookup(word.hanzi);

	// word.decomposition = decomponsition;
	// word.definitions = defitions;
	// }

	return new Response(JSON.stringify({ dictionary }));
};
