import Pinyin from 'pinyin-tone';
// import type { Writable } from 'svelte/store';

export function tone2accent(pinyin?: string) {
	// console.log('tone2accent', pinyin);
	return pinyin ? Pinyin(pinyin.toLowerCase().trim()) : '';
}

export function tone2class(pinyin?: string) {
	// console.log('tone2class', pinyin);
	if (!pinyin) return '';
	const tone = pinyin.trim().slice(-1);
	if (!isNaN(Number(tone))) {
		return `tone${tone}`;
	}
	return '';
}
