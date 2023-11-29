import type { PageServerLoad } from './$types';
import { readFileSync } from 'fs';
import path from 'path';

export const load = (async () => {

    const file = path.join(process.cwd(), 'simplified_dict.json');
    const simplified = JSON.parse(readFileSync(file, 'utf8'));
    
	return { simplified};
}) satisfies PageServerLoad;
