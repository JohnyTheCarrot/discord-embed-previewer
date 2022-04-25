<script>
  import DiscordEmbed from "./DiscordEmbed.svelte";
  import Tooltip from "./Tooltip.svelte";
  import GithubLogo from "./Icons/GithubLogo.svelte";
  import TwitterLogo from "./Icons/TwitterLogo.svelte";

  export let url,
    metaData,
    titleTagContent = undefined;

  const validColors = [
    "#BBEAA6",
    "#E3C878",
    "#E688A1",
    "#EF4B4B",
    "#7ECFC0",
    "#9EA9F0",
    "#A9ECA2",
  ];

  let color = validColors[Math.floor(Math.random() * validColors.length)];

  let date = new Date();
  let currentTime = date.toLocaleTimeString("en-us", {
    hour: "numeric",
    minute: "2-digit",
  });
  let currentTimeTooltip = date.toLocaleTimeString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  function openURL(url) {
    chrome.tabs.create({
      url,
    });
  }
</script>

<div class="message">
  <img
    class="avatar"
    src="https://cdn.discordapp.com/embed/avatars/4.png"
    alt="user avatar"
  />
  <div class="main">
    <div class="info">
      <span class="username" style="color: {color}">JohnyTheCarrot</span>
      <Tooltip>
        <span class="timestamp">Today at {currentTime}</span>
        <span slot="tooltip-content">{currentTimeTooltip}</span>
      </Tooltip>
    </div>
    <a class="url" href={"#"}>{url}</a>
    <DiscordEmbed {metaData} {titleTagContent} {url} />
  </div>

  <div class="quick-menu">
    <Tooltip>
      <span
        class="quick-menu__option"
        on:click={() => openURL("https://twitter.com/JohnyTheCarrot")}
      >
        <TwitterLogo />
      </span>
      <span slot="tooltip-content">Follow me on Twitter</span>
    </Tooltip>
    <Tooltip>
      <span
        class="quick-menu__option"
        on:click={() =>
          openURL("https://github.com/JohnyTheCarrot/discord-embed-previewer")}
      >
        <GithubLogo />
      </span>
      <span slot="tooltip-content">Github Repository</span>
    </Tooltip>
  </div>
</div>

<style>
  .message {
    display: flex;
    flex-direction: row;
    gap: 16px;
    padding: 4px 48px;
  }

  .message:hover {
    background-color: #04040512;
  }

  .message:hover .quick-menu {
    display: flex;
  }

  .quick-menu {
    position: absolute;
    display: none;
    right: 0;
    background-color: #36393f;
    margin-right: 48px;
    border-radius: 4px;
    transform: translateY(-50%);
    box-shadow: 0 0 0 1px rgba(4, 4, 5, 0.15);
  }

  .quick-menu:hover {
    box-shadow: 0 0 0 1px rgba(4, 4, 5, 0.15), 0 4px 4px rgba(0, 0, 0, 0.16);
  }

  .quick-menu__option {
    cursor: pointer;
    color: #b9bbbe;
    padding: 4px;
    display: flex;
    width: 20px;
    height: 20px;
  }

  .quick-menu__option:hover {
    color: #dcddde;
    background-color: rgba(79, 84, 92, 0.4);
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }

  .info {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .url {
    color: #00aff4;
    text-decoration: none;
    font-size: 16px;
    width: fit-content;
    overflow-wrap: anywhere;
  }

  .url:hover {
    text-decoration: underline;
  }

  .username {
    font-size: 16px;
    color: white;
  }

  .username:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .timestamp {
    font-size: 12px;
    color: #72767d;
    cursor: default;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    cursor: pointer;
  }
</style>
