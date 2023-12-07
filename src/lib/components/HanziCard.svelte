<script lang="ts">
	import { tone2accent } from '$lib/utils';

	import { dictionary } from '$lib/stores';
	import HanziWriter from 'hanzi-writer';
	// import * as hanzi from 'hanzi'
	// hanzi.start();

	import { onMount } from 'svelte';

	export let character: Hanzi;
	let dict_entry = $dictionary[character.hanzi];

	let components: string[] = [];

	$: if (dict_entry?.decomposition) {
		components = [
			...new Set(dict_entry.decomposition.components1.concat(dict_entry.decomposition.components2))
		];
	}

	onMount(() => {
		let writer = HanziWriter.create(hanzi_strokes, character.hanzi, {
			width: 100,
			height: 100,
			padding: 5,
			strokeAnimationSpeed: 5, // 5x normal speed
			delayBetweenStrokes: 500, // milliseconds
			radicalColor: '#337ab7' // blue
		});
		// writer.animateCharacter({});

		component_container.querySelectorAll('.component-item-hanzi').forEach((_element) => {
			let element = _element as HTMLElement;
			let character = element.textContent;
			element.textContent = '';

			if (!character) return;
			if (character == 'No glyph available') {
				return;
			}

			let writer = HanziWriter.create(element, character, {
				width: 40,
				height: 40,
				padding: 2,
				radicalColor: '#337ab7', // blue
				onLoadCharDataError: (err) => {
					element.textContent = character;
					element.style.width = '40px';
					element.style.height = '40px';
					element.style.padding = '2px';
					element.style.fontSize = '2vw';
					element.style.textAlign = 'center';
					element.style.lineHeight = '40px';
					console.log('err', err);
				}
			});
			console.log('writer', writer);
		});

		hanzi_strokes.addEventListener('click', () => {
			writer.animateCharacter({});
		});
	});

	let hanzi_strokes: HTMLElement;
	let component_container: HTMLElement;

	function show_component(component: string) {
		let res = '';
		if ($dictionary[component]?.radical_definition) {
			res += ` (${$dictionary[component]?.radical_definition})`;
		}
		return res;
	}
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

<div class="w-full flex flex-col">
	<!-- <div class="text-6xl w-full">{character.hanzi}</div> -->
	<div class="flex">
		<div bind:this={hanzi_strokes}></div>
		<div class="flex gap-2" bind:this={component_container}>
			{#each components as component}
				{@const def = $dictionary[component]?.radical_definition ?? ''}
				<div class="items-center flex flex-col h-full">
					<div class="component-item-hanzi">{component}</div>
					{#each def.split('/') as definition}
						<div class="component-item-definition">{definition}</div>
					{/each}
					<!-- <div class="grow-1">{$dictionary[component]?.radical_definition??""}</div> -->
				</div>
			{/each}
		</div>

		<!-- {#if $dictionary[character.hanzi].decomposition}
			<div class="text-left items-end">
				<div class="w-full">
					{#each $dictionary[character.hanzi].decomposition.components1 as component}
						<span>{show_component(component)}</span>
					{/each}
				</div>
				<div class="w-full justify-start">
					{#each $dictionary[character.hanzi].decomposition.components2 as component}
						<span>{show_component(component)}</span>
					{/each}
				</div>
			</div>
		{/if} -->
	</div>
	<!-- {#if $dictionary[character.hanzi].decomposition2}
    <div class="w-full" bind:this={decomposition2}></div>
  {/if} -->
	<!-- <div class="w-full"></div>
	<div class="w-full"></div> -->

	<!-- {#if $dictionary} -->
	<!-- {@const dictionary_entry = $dictionary[character.hanzi]} -->
	<!-- {@debug dictionary_entry} -->
	{#if $dictionary[character.hanzi].definitions}
		{#each $dictionary[character.hanzi].definitions as definition}
			<div class="text-xl ml-2">{tone2accent(definition.pinyin)}</div>
			<div class="ml-2 whitespace-normal">{definition.definition}</div>
		{/each}
		<!-- {#each character.definitions as variant}
			<div class="text-xl ml-2">{tone2accent(variant.pinyin)}</div>
			<div class="ml-2 whitespace-normal">{variant.english}</div>
		{/each} -->
	{/if}
	<!-- {/if} -->
</div>
