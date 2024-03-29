<script>
  import he from "he";
  import Tooltip from "./Tooltip.svelte";

  export let url;
  export let metaData;
  export let titleTagContent = undefined;

  let noEmbedPossible;

  const maxTitleLength = 70;
  const ellipsis = "...";

  function findAndExtract(value, keyToExtract) {
    console.log(metaData);
    const extractedValue = (metaData.find(
      (data) => (data["property"] ?? data["name"] ?? "").toLowerCase() === value
    ) ?? {})[keyToExtract];

    if (extractedValue) return he.decode(extractedValue);

    return undefined;
  }

  let embedData = {
    borderColor: findAndExtract("theme-color", "content"),
    siteName: findAndExtract("og:site_name", "content"),
    title:
      findAndExtract("og:title", "content") ??
      findAndExtract("twitter:title", "content"),
    description:
      findAndExtract("description", "content") ??
      findAndExtract("og:description", "content") ??
      findAndExtract("twitter:description", "content"),
    imageUrl: findAndExtract("og:image", "content"),
    imageWidthProperty: findAndExtract("og:image:width", "content"),
    imageHeightProperty: findAndExtract("og:image:height", "content"),
    twitterCard: findAndExtract("twitter:card", "content"),
  };

  let {
    borderColor,
    siteName,
    title,
    description,
    imageUrl,
    imageWidthProperty,
    imageHeightProperty,
    twitterCard,
  } = embedData;

  let imageHeight;
  let imageIsLarge;

  noEmbedPossible = Object.values(embedData).every((v) => v === undefined);
  if (!noEmbedPossible) {
    if (!title) title = titleTagContent;

    if (title.length > maxTitleLength)
      title = title.substring(0, maxTitleLength - ellipsis.length) + ellipsis;

    if (
      imageUrl &&
      !imageUrl.startsWith("http") &&
      !imageUrl.startsWith("file")
    ) {
      imageUrl = new URL(imageUrl, url).href;
    }
    let aspectRatio = imageWidthProperty / imageHeightProperty;
    imageHeight = 80 / aspectRatio;
    imageIsLarge = twitterCard === "summary_large_image";
  }
</script>

{#if !noEmbedPossible}
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
      <img
        src={imageUrl}
        class="image"
        alt=""
        style="height: {imageHeight}px;"
      />
    {/if}
  </div>

  <Tooltip>
    <p class="disclaimer-tooltip-trigger">Disclaimer</p>
    <span slot="tooltip-content">
      Custom embeds like<br /> YouTube's & Twitter's<br /> are not supported.
    </span>
  </Tooltip>
{/if}

<style>
  .embed {
    border-left-width: 4px;
    border-left-style: solid;
    padding: 0.5rem 1rem 1rem 0.75rem;
    background-color: var(--embed-color);
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
    color: var(--text);
  }

  .description {
    font-size: 14px;
    color: var(--text);
    white-space: pre-wrap;
  }

  .disclaimer-tooltip-trigger {
    color: var(--text);
    margin: 0;
    opacity: 0.5;
    cursor: default;
  }
</style>
