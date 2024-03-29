<script>
  import DiscordEmbed from "./DiscordEmbed.svelte";
  import Tooltip from "./Tooltip.svelte";
  import GithubLogo from "./Icons/GithubLogo.svelte";
  import Mastodon from "./Icons/Mastodon.svelte";

  export let url,
    metaData,
    titleTagContent = undefined;

  const validColors = [
    ["#BBEAA6", "#4CAF50"],
    ["#E3C878", "#FFD700"],
    ["#E688A1", "#FF69B4"],
    ["#EF4B4B", "#FF6347"],
    ["#7ECFC0", "#008B8B"],
    ["#9EA9F0", "#4169E1"],
    ["#A9ECA2", "#32CD32"],
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
      <span class="username" style="--dark: {color[0]}; --light: {color[1]}">JohnyTheCarrot</span>
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
        on:click={() => openURL("https://elk.zone/m.webtoo.ls/@JohnyTheCarrot@toot.community")}
      >
        <Mastodon />
      </span>
      <span slot="tooltip-content">Follow me on Mastodon</span>
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
    background-color: var(--buttons-bg);
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
    color: var(--buttons-icon);
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
  }

  .quick-menu__option:hover {
    color: var(--buttons-icon-hover);
    background-color: var(--buttons-bg);
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
  }

  @media (prefers-color-scheme: dark) {
    .username {
      color: var(--dark);
    }
  }

  @media (prefers-color-scheme: light) {
    .username {
      color: var(--light);
    }
  }

  .username:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .timestamp {
    font-size: 12px;
    color: var(--timestamp);
    cursor: default;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    cursor: pointer;
  }
</style>
