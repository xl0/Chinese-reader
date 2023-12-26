<script lang="ts">
	import { tone2accent } from '$lib/utils';

	import { dictionary, strokes } from '$lib/stores';

	import HanziWriter from 'hanzi-writer';

	import { onMount } from 'svelte';

	export let hanzi: string;

	let hanzi_strokes: HTMLElement;
	let card: HTMLElement;
	let component_container: HTMLElement;

	async function get_strokes(char: string) {
		if (char in $strokes) return $strokes[char];
		const res = await fetch('/strokes/', {
			method: 'POST',
			body: JSON.stringify(char)
		});
		return await res.json();
	}

	async function assign_strokes() {
		let components = $dictionary[hanzi]?.components;

		if (!hanzi_strokes) return;
		console.log('components', components);
		console.log('dictionary', $dictionary);

		hanzi_strokes.textContent = '';

		let writer = HanziWriter.create(hanzi_strokes, hanzi, {
			width: 100,
			height: 100,
			padding: 5,
			strokeAnimationSpeed: 4, // x times normal speed
			delayBetweenStrokes: 400, // milliseconds
			radicalColor: '#337ab7', // blue
			charDataLoader: async function (char, onLoad, onError) {
				const res = await get_strokes(char);
				if (res) {
					onLoad(res);
				} else {
					onError();
				}
				return res;
			}
		});

		component_container.textContent = '';

		if (!components) return;

		for (let component of components) {
			console.log('component', component);
			if (!component) return;
			if (component == 'No glyph available') {
				return;
			}

			let radical_box = document.createElement('div');
			radical_box.className = 'items-center flex flex-col h-full';

			let radical_hanzi = document.createElement('div');
			let radical_definition = document.createElement('div');

      console.log('radical_definition', $dictionary[component]);

			radical_definition.textContent = $dictionary[component]?.radical_definition ?? 'xx';

			radical_box.appendChild(radical_hanzi);
			radical_box.appendChild(radical_definition);

			component_container.appendChild(radical_box);

			let writer = HanziWriter.create(radical_hanzi, component, {
				width: 40,
				height: 40,
				padding: 2,
				radicalColor: '#337ab7', // blue
				onLoadCharDataError: (err) => {
					radical_hanzi.textContent = component;
					radical_hanzi.style.width = '40px';
					radical_hanzi.style.height = '40px';
					radical_hanzi.style.padding = '2px';
					radical_hanzi.style.fontSize = '2vw';
					radical_hanzi.style.textAlign = 'center';
					radical_hanzi.style.lineHeight = '40px';
					console.log('err', err);
				},
				charDataLoader: async function (char, onLoad, onError) {
          const res = await get_strokes(char);
          if (res) {
            onLoad(res);
          } else {
            onError();
          }
          return res;
        }
					

			});


		}

		hanzi_strokes.addEventListener('click', () => {
			writer.animateCharacter({});
		});
	}

	onMount(() => {
		console.log('## HanziCard onMount');
		assign_strokes();
	});

	$: {
		console.log('## HanziCard update');
		hanzi;
		assign_strokes();
	}


</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

<div class="min-w-full flex flex-col" bind:this={card}>
	<div class="flex">
		<div bind:this={hanzi_strokes}></div>
		<div class="flex gap-2" bind:this={component_container}>

		</div>
	</div>
	{#if $dictionary[hanzi]?.definitions}
		{#each $dictionary[hanzi].definitions as definition}
			<div class="text-xl font-bold ml-2">{tone2accent(definition.pinyin)}</div>
			<div class="ml-2">{definition.definition.replaceAll("/", " / ")}</div>
		{/each}
	{/if}
</div>
