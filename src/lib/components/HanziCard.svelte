<script lang="ts">
	import { tone2accent } from '$lib/utils';

	import { dictionary, strokes } from '$lib/stores';

	import HanziWriter from 'hanzi-writer';

	import { onMount } from 'svelte';

	export let hanzi: string;

	let hanzi_strokes: HTMLElement;
	let card: HTMLElement;
	let component_container: HTMLElement;
	let components_container: HTMLElement;

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
		// console.log('hanzi_strokes', dict_entry);
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
				// const res = await fetch('/strokes/', {
				// 	method: 'POST',
				// 	body: JSON.stringify(char)
				// });
				// const res_json = await res.json();
				// onComplete(res_json);
				// return res_json;

				// return await (await fetch('/strokes/' + char)).json();
				// return dictionary[char].strokes;
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
					

				//   .then((res) => {
				// 		res.json().then((res) => {
				// 			console.log('res', res);
				// 			if (res) onComplete(res);
				// 		});
				// 	}).catch((err) => {
				//     console.log('err', err);
				//   });
				// }
			});

			// if (!component) return;
			// if (component == 'No glyph available') {
			// 	return;
			// }
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

	// function show_component(component: string) {
	// 	let res = '';
	// 	if (dictionary[component]?.radical_definition) {
	// 		res += ` (${dictionary[component]?.radical_definition})`;
	// 	}
	// 	return res;
	// }
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->

<div class="min-w-full flex flex-col" bind:this={card}>
	<div class="flex">
		<div bind:this={hanzi_strokes}></div>
		<div class="flex gap-2" bind:this={component_container}>
			<!-- {#each components as component}
				{@const def = dictionary[component]?.radical_definition ?? ''}
				<div class="items-center flex flex-col h-full" bind:this={components_container}>
					<div class="component-item-hanzi">??</div>
					{#each def.split('/') as definition}
						<div class="component-item-definition">{definition}</div>
					{/each}
				</div>
			{/each} -->
		</div>
	</div>
	{#if $dictionary[hanzi]?.definitions}
		{#each $dictionary[hanzi].definitions as definition}
			<div class="text-xl font-bold ml-2">{tone2accent(definition.pinyin)}</div>
			<div class="ml-2">{definition.definition.replaceAll("/", " / ")}</div>
		{/each}
	{/if}
</div>
