import { onDestroy } from 'svelte';
import { writable } from 'svelte/store';



export const createLocalStorageStore = <T>(key: string, initialValue: T) => {
    if (typeof window === 'undefined') return writable<T>(initialValue);

	const store = writable<T>();
    console.log({item: localStorage.getItem(key)})

	store.set(
		localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) as string) : initialValue
	);

	const unsubscirbe = store.subscribe((v) => {
		localStorage.setItem(key, JSON.stringify(v));
	});

	// onDestroy(unsubscirbe);

    const reset = () => {
        store.set(initialValue);
    }

	return {...store, reset};
};
