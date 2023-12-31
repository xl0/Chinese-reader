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

export function get_components(item: string) {
	let d = hanzi.decompose(item);

	let all_components: string[] = [];
	if (d.components1)
		all_components.push(...d.components1.filter((x: string) => x != 'No glyph available'));
	if (d.components2)
		all_components.push(...d.components2.filter((x: string) => x != 'No glyph available'));

	return Array.from(new Set(all_components));
}

export function get_definition(item: string) {
	return hanzi.definitionLookup(item);
}

export function get_radical_meaning(item: string) {
	let m = hanzi.getRadicalMeaning(item);
	return m != 'N/A' ? m : null;
}
