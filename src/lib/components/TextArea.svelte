<script lang="ts">
	import { tick } from 'svelte';
	import { twMerge } from 'tailwind-merge';

	export let value: string;
	let classes = '';
	export { classes as class };

	let element: HTMLTextAreaElement;

	function adjustHeight(target: EventTarget | null) {
		if (target instanceof HTMLTextAreaElement) {
			const element = target;
			element.style.height = 'auto';
			element.style.height = `${element.scrollHeight + 2}px`;
			console.log('adjustHeight', element.scrollHeight, element.style.height);
		} else {
			console.warn('adjustHeight: target is not HTMLTextAreaElement', target);
		}
	}

	$: {
		value; // trigger on reactivity
		if (element) tick().then(() => adjustHeight(element));
	}
</script>

<textarea
	{...$$restProps}
	class={twMerge('textarea textarea-bordered h-auto resize-none', classes)}
	bind:value
	bind:this={element}
	on:input={(e) => adjustHeight(e.target)}
	on:change
/>
