<script lang="ts">
	import HanziCard from '$lib/components/HanziCard.svelte';
	import type { PageData } from './$types';
	import StoriesPage from './stories/+page.svelte';
	import HanziPage from './hanzi/+page.svelte';

	export let data: PageData;
</script>

<div class="flex min-w-full min-h-screen">
	<div class="w-1/2 prose">
		<StoriesPage {data} />
	</div>
	<div class=" border border-gray-500 m-2"></div>
	<div class="">
		<HanziPage {data} />
	</div>
</div>
