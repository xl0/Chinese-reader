import { createLocalStorageStore } from './localStorageStore';
export let story = createLocalStorageStore<string>('story', '');