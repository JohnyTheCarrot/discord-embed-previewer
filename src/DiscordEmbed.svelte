<script>
  import he from "he";
  import Tooltip from "./Tooltip.svelte";

  export let url;
  export let metaData;
  export let titleTagContent = undefined;

  function findAndExtract(value, keyToExtract) {
    const extractedValue = (metaData.find(
      (data) => (data["property"] ?? data["name"] ?? "").toLowerCase() === value
    ) ?? {})[keyToExtract];

    if (extractedValue) return he.decode(extractedValue);

    return undefined;
  }

  let borderColor = findAndExtract("theme-color", "content");
  let siteName = findAndExtract("og:site_name", "content");
  let title =
    findAndExtract("og:title", "content") ??
    findAndExtract("twitter:title", "content");
  let description =
    findAndExtract("description", "content") ??
    findAndExtract("og:description", "content") ??
    findAndExtract("twitter:description", "content");

  if (description) {
    console.log(titleTagContent);
    title = titleTagContent;
  }

  let imageUrl = findAndExtract("og:image", "content");

  if (!imageUrl.startsWith("http") && !imageUrl.startsWith("file")) {
    imageUrl = new URL(imageUrl, url).href;
  }
  let imageWidthProperty = findAndExtract("og:image:width", "content") ?? 80;
  let imageHeightProperty = findAndExtract("og:image:height", "content");
  let aspectRatio = imageWidthProperty / imageHeightProperty;
  let imageHeight = 80 / aspectRatio;
  let imageIsLarge =
    findAndExtract("twitter:card", "content") === "summary_large_image";
</script>

<div
  class="embed"
  style="border-left-color: {borderColor ?? '#202225'}"
  class:embed-image-large={imageIsLarge}
>
  <div class="content">
    {#if siteName}
      <span class="site-name">{siteName}</span>
    {/if}
    {#if title}
      <span class="title">{title}</span>
    {/if}
    {#if description}
      <span class="description">{description}</span>
    {/if}
    {#if imageUrl && imageIsLarge}
      <img class="image--large" alt="" src={imageUrl} />
    {/if}
  </div>
  {#if imageUrl && !imageIsLarge}
    <img src={imageUrl} class="image" alt="" style="height: {imageHeight}px;" />
  {/if}
</div>

<Tooltip>
  <p class="disclaimer-tooltip-trigger">Disclaimer</p>
  <span slot="tooltip-content">
    Custom embeds like<br /> YouTube's & Twitter's<br /> are not supported.
  </span>
</Tooltip>

<!--<details>-->
<!--  Discord has embeds for certain sites that are handled differently than most-->
<!--  sites. Examples include Twitter & YouTube. I do not currently support these-->
<!--  type of embeds. The purpose of this extension is not 1:1 accuracy in all-->
<!--  cases. The purpose is allowing web devs to see what their own site looks like-->
<!--  in Discord. I thought it was safe to assume your site is not listed among-->
<!--  these exceptions, so it is significantly easier not to handle them.-->
<!--  <summary>Disclaimer</summary>-->
<!--</details>-->

<!--<details>-->
<!--  <summary>decoded meta</summary>-->
<!--  <pre>-->
<!--    {JSON.stringify(metaData, null, 2)}-->
<!--  </pre>-->

<!--</details>-->
<style>
  .embed {
    border-left-width: 4px;
    border-left-style: solid;
    padding: 0.5rem 1rem 1rem 0.75rem;
    background-color: #2f3136;
    border-radius: 4px;
    max-width: 520px;
    width: fit-content;
    display: flex;
    flex-direction: row;
    gap: 16px;
    box-sizing: border-box;
  }

  .embed-image-large {
    max-width: 432px;
  }

  .image {
    width: 80px;
    height: fit-content;
    margin-top: 8px;
    border-radius: 3px;
  }

  .image--large {
    width: 400px;
    margin-top: 16px;
    border-radius: 4px;
  }

  .site-name,
  .description,
  .title {
    display: block;
    margin-top: 8px;
    width: fit-content;
  }

  .title {
    color: #00aff4;
    font-size: 16px;
    font-weight: 600;
  }

  .title:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .site-name {
    font-size: 12px;
    color: #dcddde;
  }

  .description {
    font-size: 14px;
    color: #dcddde;
    white-space: pre-wrap;
  }

  .disclaimer-tooltip-trigger {
    margin: 0;
    opacity: 0.5;
    cursor: default;
  }
</style>
