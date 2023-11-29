<script lang="ts">
	import * as pt2 from 'pinyin-tone/v2';
	export let value: string = '';
	export let metadata: Array<any>|undefined = undefined;

	function tone2accent(pinyn: string) {
    console.log('tone2accent', pinyn);
		return pt2(pinyn);
	}

	function tone2class(pinyn: string) {
		const tone = pinyn.slice(-1);
		if (!isNaN(Number(tone))) {
			return `tonecolor${tone}`;
		}
		return '';
	}
</script>

<div class="flex flex-col border rounded-sm min-w-fit group relative">
	<div class="text-6xl">
		{value}
	</div>
	{#if metadata}
		<div
			class="hidden group-hover:block absolute top-full min-w-fit bg-white p-2 rounded border m-2 shadow z-10"
		>
			{#each metadata as meta}
				<!-- {@debug meta} -->
				{@const pinyin = meta[0]}
				{@const english = meta[1]}

				<div>
					{#if pinyin}
						{#each pinyin.split(' ') as p}
							<span class={tone2class(p)}>{tone2accent(p)}</span><span>&nbsp;</span>
						{/each}
					{/if}
					<!-- <div class="text-xs whitespace-pre-wrap">{tone2accent(pinyin)}</div> -->
					<div class="text-xs whitespace-nowrap">{english}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
