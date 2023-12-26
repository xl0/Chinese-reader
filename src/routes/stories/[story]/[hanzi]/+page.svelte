<script lang="ts">
	import { page } from '$app/stores';
	import HanziCard from '$lib/components/HanziCard.svelte';
	// import type { PageData } from './$types';

	// export let data: PageData;
</script>


<!-- {#if p.hanzi} -->
<HanziCard hanzi={$page.params.hanzi} />
<!-- {:else}
	sdfsd -->
<!-- <HanziCard hanzi={data.hanzi} /> -->
<!-- {/if} -->
