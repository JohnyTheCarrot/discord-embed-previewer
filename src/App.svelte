<script>
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

  chrome.runtime.onMessage.addListener((req) => {
    if (req.op === "HELLO") {
      attemptHeadRetrieval();
    }
  });

  function attemptHeadRetrieval() {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      url = tab.url;

      chrome.tabs.sendMessage(tab.id, { op: "GIMME_HEAD" }, (res) => {
        if (chrome.runtime.lastError) {
          error = true;
          return;
        }

        error = false;

        const dom = new DOMParser().parseFromString(res, "text/html");
        meta = Array.from(dom.querySelectorAll("meta")).map(parseMetaTag);
        titleTagContent = dom.querySelector("title").innerText;
      });
    });
  }

  function reloadPage() {
    chrome.tabs.reload();
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
  @media (prefers-color-scheme: dark) {
    :root {
      --bg-main: #36393f;
      --text: rgb(219, 222, 225);
      --embed-color: #2f3136;
      --tooltip-bg: #111214;
      --buttons-bg: #2D2F33;
      --buttons-border: #27292D;
      --buttons-icon: #B6BBC1;
      --buttons-icon-hover: #D8DBDD;
      --timestamp: #949ba4;
    }
  }

  @media (prefers-color-scheme: light) {
    :root {
      --bg-main: #F7F7F7;
      --text: #313338;
      --embed-color: #F2F3F5;
      --tooltip-bg: #FFFFFF;
      --buttons-bg: #FFFFFF;
      --buttond-border: #E4E4E5;
      --buttons-icon: #4E5058;
      --buttons-icon-hover: #313338;
      --timestamp: #5c5e66;
    }
  }

  .container {
    background-color: var(--bg-main);
    color: var(--bg-main);
    padding: 56px 0;
    min-width: 650px;
    font-family: sans-serif;
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
    color: var(--text);
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 3px;
    padding: 8px 16px;
    background-color: hsl(235, 85.6%, 64.7%);
    color: var(--text);
  }
</style>
