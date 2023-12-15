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

async function populate_dictionary(item: string, dictionary: Record<string, DictEntry>) {
	console.log('populate_dictionary', item);
	const definitions: Definition[] = hanzi.definitionLookup(item);
	console.log('defitions', definitions);
	const decomponsition = hanzi.decompose(item);

	// const strokes = await import(`hanzi-writer-data/${item}`) as any as {default: any};
	// const strokes = await import(`hanzi-writer-data/${item}`, { assert: { type: 'json' } })

	let strokes = null;
	try {
		strokes = await import(`/node_modules/hanzi-writer-data/${item}`);
	} catch (e) {}


	console.log('decomponse', decomponsition);

	let radical = hanzi.getRadicalMeaning(item);
	radical = radical != 'N/A' ? radical : undefined;

	if (!radical && definitions) {
		radical = '';
		for (let definition of definitions) {
			let dd = definition.definition;
			console.log(definition.definition);
			if (!dd.includes('urname')) {
				if (dd.includes('/')) dd = dd.split('/')[0];
				if (dd.length < 10) radical += '[' + dd + '] ';
			}
		}
		radical = radical?.trim();
	}

	dictionary[item] = {
		definitions: definitions,
		decomposition: decomponsition,
		radical_definition: radical,
        strokes: strokes
	};
	for (let component of decomponsition.components1) {
		console.log('conponent', component);
		if (component != 'No glyph available' && !dictionary[component]) {
			populate_dictionary(component, dictionary);
		}
	}

	console.log('decomponsition.components2', decomponsition.components2);
	for (let component of decomponsition.components2) {
		console.log('conponent', component);
		if (component != 'No glyph available' && !dictionary[component]) {
			populate_dictionary(component, dictionary);
		}
	}

	return dictionary;
}

export const POST: RequestHandler = async ({ request }) => {
	const res = await request.json();
	const items: string[] = res;

	console.log('POST lookup', items);

	let dictionary: Record<string, DictEntry> = {};

	for (let item of items) {
		await populate_dictionary(item, dictionary);

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

	return new Response(JSON.stringify(dictionary));
};
