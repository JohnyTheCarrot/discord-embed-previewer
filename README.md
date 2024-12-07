# Discord Embed Previewer

[Install on Chrome Web Store](https://chrome.google.com/webstore/detail/discord-embeds/faeojpkidgnhcochgodeklokfimbencc)

## The problem

When I was working on the Rythm website I came across the problem that I
couldn't test the Discord embed, as what I was building was not yet to be announced.
If I put it under a URL, it would've leaked eventually.
Even when this is not a problem, perhaps in the case of an open-source project,
it is still annoying and time-consuming to have to deploy your site somewhere to find out
what it looks like in Discord. Not to mention you'd have to keep adding to the query string to
bypass Discord's caching systems.

## The solution

I've made an extension that allows you to preview any site's Discord embed.
This should make checking what it roughly looks like on Discord a trivial process.

## Known issues

* [LOOKING INTO] Still looking into the legality of using the Whitney font that Discord uses in their clients. If I find a way to do it in a legal way, I'll be sure to add the actual font in.
* [WON'T FIX] YouTube and Twitter have custom embeds in-client, I do not plan to support these as these are out of scope of this project.

## Reporting inaccuracies

You can just open an issue.
Reporting inaccuracies is greatly appreciated.

## Images

![](https://github.com/JohnyTheCarrot/discord-embed-previewer/blob/main/readme-images/image1.png?raw=true)
![](https://github.com/JohnyTheCarrot/discord-embed-previewer/blob/main/readme-images/image2.png?raw=true)
![](https://github.com/JohnyTheCarrot/discord-embed-previewer/blob/main/readme-images/image3.png?raw=true)

## Browser Support
I currently support Firefox and Chrome.
Any browser that is based on either should theoretically work.

## Building

1. Install node.js, known to work on v22.11.0
2. Install pnpm, `npm install -g pnpm` (technically you can use npm or yarn, but I use pnpm)
3. Clone the repository
4. Run `pnpm install`
5. Run `pnpm build`, alternatively use `pnpm dev` for automatic rebuilding on file changes.
6. The built extension will be in the `public` folder.
7. Load the extension in your respective browser. Look up how to do this for your browser.
