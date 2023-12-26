<script lang="ts">
	import HanziCard from '$lib/components/HanziCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Explore Hanzi</h1>
<HanziCard hanzi={data.random_hanzi} />
