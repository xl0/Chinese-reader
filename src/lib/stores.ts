import { writable } from 'svelte/store';
import { createLocalStorageStore } from './localStorageStore';


export let original_text = createLocalStorageStore<string>('original_text', '');
export let chinese_text = createLocalStorageStore<string>('chinese_text', '');
export let annotated_chinese = createLocalStorageStore<string>('annotated_chinese', '');

export let dictionary = createLocalStorageStore<Record<string, DictEntry>>("dictionary", {});
export let strokes = createLocalStorageStore<Record<string, any>>("strokes", {});
