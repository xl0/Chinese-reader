<script lang="ts">
	import { tone2accent } from '$lib/utils';

	import { dictionary } from '$lib/stores';
	import HanziWriter from 'hanzi-writer';
	// import * as hanzi from 'hanzi'
	// hanzi.start();

	import { onMount } from 'svelte';

	export let character: Hanzi;
  let dict_entry = $dictionary[character.hanzi];

	onMount(() => {
		var writer = HanziWriter.create(hanzi_strokes, character.hanzi, {
			width: 100,
			height: 100,
			padding: 5,
			strokeAnimationSpeed: 5, // 5x normal speed
			delayBetweenStrokes: 500, // milliseconds
			radicalColor: '#337ab7' // blue
		});
    writer.animateCharacter({});

		hanzi_strokes.addEventListener('click', () => {
			writer.animateCharacter({});
		});

	});

	let hanzi_strokes: HTMLElement;

</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

<div class="card-body w-full">
	<!-- <div class="text-6xl w-full">{character.hanzi}</div> -->
	<div class="w-full" bind:this={hanzi_strokes}></div>
  {#if $dictionary[character.hanzi].decomposition}
    <div class="w-full">{character.hanzi}:
      {#each $dictionary[character.hanzi].decomposition.components1 as component}
        <span class="">{component} {$dictionary[component].radical_definition}</span>
      {/each}
    </div>
    <div class="w-full">{character.hanzi}: {$dictionary[character.hanzi].decomposition.components2}</div>
  {/if}
  <!-- {#if $dictionary[character.hanzi].decomposition2}
    <div class="w-full" bind:this={decomposition2}></div>
  {/if} -->
	<div class="w-full"></div>
	<div class="w-full"></div>

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