import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({params}) => {
    console.log('hanzi', params.hanzi);

    let strokes = await import(`/node_modules/hanzi-writer-data/${params.hanzi}`)
    console.log('strokes', strokes);
	return new Response();
};
