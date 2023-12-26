import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, setHeaders }) => {
	const hanziList = (await request.json()) as string[];
	const strokes: Record<string, any> = {};

	for (const hanzi of hanziList) {
		try {
			strokes[hanzi] = (await import(`/node_modules/hanzi-writer-data/${hanzi}`)).default;
		} catch (e) {
			console.log(`Failed to get strokes for ${hanzi}`);
            strokes[hanzi] = null;
		}
	}

	console.log('/strokes/ : ', strokes);

	return new Response(JSON.stringify(strokes));
};
