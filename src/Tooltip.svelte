<script>
  import { scale } from "svelte/transition";

  let isHovered = false;

  function mouseOver() {
    isHovered = true;
  }

  function mouseLeave() {
    isHovered = false;
  }
</script>

<span
  class="tooltip-parent"
  on:mouseover={mouseOver}
  on:mouseleave={mouseLeave}
>
  {#if isHovered}
    <span class="tooltip" transition:scale={{ start: 0.95, duration: 150 }}>
      <slot name="tooltip-content" />
    </span>
  {/if}
  <slot />
</span>

<style>
  .tooltip-parent {
    position: relative;
  }

  .tooltip {
    pointer-events: none;
    background-color: #18191c;
    padding: 8px 12px;
    font-size: 12px;
    position: absolute;
    left: 50%;
    bottom: calc(100% + 8px);
    color: #dcddde;
    transform: translateX(-50%);
    border-radius: 5px;
    white-space: nowrap;
  }

  .tooltip::after {
    position: fixed;
    content: "";
    left: 50%;
    top: 100%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: transparent;
    border-top-color: #18191c;
  }
</style>
