<script>
  import browser from "webextension-polyfill";
  import DiscordMessage from "./DiscordMessage.svelte";
  import ReloadSVG from "./Icons/ReloadSVG.svelte";

  let meta;
  let titleTagContent;
  let error = false;
  let url;

  function parseMetaTag(tag) {
    return Array.from(tag.attributes)
      .map(({ name, value }) => ({ [name]: value }))
      .reduce((acc, next) => ({ ...acc, ...next }), {});
  }

  browser.runtime.onMessage.addListener((req) => {
    if (req.op === "HELLO") {
      attemptHeadRetrieval();
    }
  });

  function attemptHeadRetrieval() {
    browser.tabs
      .query({ active: true, currentWindow: true })
      .then(([tab]) => {
        url = tab.url;

        return browser.tabs.sendMessage(tab.id, { op: "GIMME_HEAD" });
      })
      .then((res) => {
        if (browser.runtime.lastError) {
          error = true;
          return;
        }

        error = false;

        const dom = new DOMParser().parseFromString(res, "text/html");
        meta = Array.from(dom.querySelectorAll("meta")).map(parseMetaTag);
        titleTagContent = dom.querySelector("title").innerText;
      })
      .catch(() => (error = true));
  }

  function reloadPage() {
    browser.tabs.reload();
  }

  attemptHeadRetrieval();

  $: console.log(error);
  $: console.log(meta);
</script>

<div class="container">
  {#if error}
    <div class="error">
      <ReloadSVG />
      <div class="error-action">
        <p>Please reload the target page.</p>
        <button on:click={reloadPage}>Reload</button>
      </div>
    </div>
  {:else if meta}
    <DiscordMessage metaData={meta} {url} {titleTagContent} />
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<style>
  .container {
    color: white;
    padding: 56px 0;
    min-width: 750px;
  }

  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .error-action {
    margin: 32px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .error-action p {
    margin: 0 0 16px;
    font-size: 16px;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 3px;
    padding: 8px 16px;
    background-color: hsl(235, 85.6%, 64.7%);
    color: white;
  }
</style>
