import type { PageServerLoad } from './$types';
import { stories } from '$lib/stories';
import { get_definition } from '$lib/utils.server';

let hanzi_set = new Set<string>();
for (let story of stories) {
	for (let hanzi of story.story_cn) {
		if (get_definition(hanzi)) hanzi_set.add(hanzi);
	}
}

export const load = (async () => {
	const titles = stories.map((story) => {
		return { title_cn: story.title_cn, title_orig: story.title_orig };
	});

	const randomIndex = Math.floor(Math.random() * hanzi_set.size);
	const random_hanzi = Array.from(hanzi_set)[randomIndex];

	return { titles, random_hanzi };
}) satisfies PageServerLoad;
