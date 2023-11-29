import type { PageServerLoad } from './$types';
import * as fs from 'fs';

export const load = (async () => {
    const simplified = JSON.parse(fs.readFileSync('simplified_dict.json', 'utf8'));
    
	return { simplified};
}) satisfies PageServerLoad;
