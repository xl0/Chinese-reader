import { writable } from 'svelte/store';
import { createLocalStorageStore } from './localStorageStore';

export let dictionary = createLocalStorageStore<Record<string, DictEntry>>("dictionary", {});
export let strokes = createLocalStorageStore<Record<string, any>>("strokes", {});
