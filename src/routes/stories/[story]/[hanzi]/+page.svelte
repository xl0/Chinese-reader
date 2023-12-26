<script lang="ts">
	import { page } from '$app/stores';
	import HanziCard from '$lib/components/HanziCard.svelte';
	// import type { PageData } from './$types';

	// export let data: PageData;
</script>

<HanziCard hanzi={$page.params.hanzi} />
