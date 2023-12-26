import type { RequestHandler } from './$types';

import { get_components, get_definition, get_radical_meaning } from '$lib/utils.server';



export const POST: RequestHandler = async ({ request }) => {
	const all_hanzi = await request.json();

	let results: Record<string, DictEntry> = {};

	for (let hanzi of all_hanzi) {
		const definitions: Definition[] = get_definition(hanzi);
		const components = get_components(hanzi);

		results[hanzi] = {
			definitions,
			components,
            radical_definition: get_radical_meaning(hanzi),
		};
	}

	return new Response(JSON.stringify(results));

};
