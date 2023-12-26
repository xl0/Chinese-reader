<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="prose">
  <h1 class="text-xl font-bold">Read a story</h1>
	<ul>
		{#each data.titles as title, i }
			<li><a href="/stories/{i.toString()}">{title.title_cn} ({title.title_orig})</a></li>
		{/each}
	</ul>
</div>
