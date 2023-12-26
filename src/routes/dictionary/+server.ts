import type { RequestHandler } from './$types';

import * as hanzi from 'hanzi';
import { get_components, get_definition, get_radical_meaning } from '$lib/utils.server';

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

// import {populate_dictionary} from '$lib/utils';

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

async function get_strokes(item: string) {
	let strokes = null;
	try {
		strokes = (await import(`/node_modules/hanzi-writer-data/${item}`)).default;
	} catch (e) {}
	// console.log('strokes', strokes);

	return strokes.default;
}

export const POST: RequestHandler = async ({ request }) => {
	const all_hanzi = await request.json();
	console.log('POST lookup', all_hanzi);

	let results: Record<string, DictEntry> = {};

	for (let hanzi of all_hanzi) {
		const definitions: Definition[] = get_definition(hanzi);
		// console.log('defitions', definitions);
		const components = get_components(hanzi);

		// const decomp12 = new Set(
		//     components.components1
		//         .concat(components.components2)
		//         .filter((x: string) => x != 'No glyph available')
		// );

		// console.log(components);

		results[hanzi] = {
			definitions,
			components,
            radical_definition: get_radical_meaning(hanzi),
		};
	}

    console.log('results', results);

	return new Response(JSON.stringify(results));

	// let dictionary: Record<string, DictEntry> = {};

	// for (let item of items) {
	// 	await populate_dictionary(item, dictionary);
	// }

	// return new Response(JSON.stringify(dictionary));
};
