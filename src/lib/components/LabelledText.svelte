<script lang="ts">
  import { twMerge } from 'tailwind-merge';

  export let value: string = "";
  export let label: string | undefined = undefined;
  export let html = false;
  let classes = "";
  export { classes as class };

  function select_all_content(e: KeyboardEvent) {
    console.log(e);
    if (e.ctrlKey && e.key === "a") {
      e.preventDefault();
      let range = document.createRange();
      let target = e.target as Node;
      range.selectNodeContents(target);
      let sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }
</script>

<div class={twMerge("relative  border rounded-sm p-1 mt-2", classes)}>
  {#if label}
    <div class="absolute label-text-alt -top-2 px-1 bg-white rounded">{label}</div>
  {/if}
  <div on:keydown={select_all_content} tabindex="0" role="textbox" class="whitespace-pre-wrap">
    {#if html}
      {@html value}
    {:else}
      {value}
    {/if}
  </div>
  <slot />
</div>
