# Installations
```
npm i discord-pagination-advanced
```

# What ?
An package to easily create pagination not only for embeds but also for simple string messages, with buttons.

# Why ?
- fast and advanced.
- Auto deletion . Ephermal message.
- Easy and customizable.

# How ?
```js
const page = require('discord-pagination-advanced');

const pages = ["some string", aMessagEmbed, anotherEmbed,"some more string maybe"];

/**
 * @param message The message Object
 * @param pages The array of pages. 
 */
page(message,pages);
```

# Advanced
```js
const page = require('discord-pagination-advanced');

const pages = ["some string", aMessagEmbed, anotherEmbed,"some more string maybe"];
const options =  {
    ephemeral: true, // Message should be ephermal or not,NOTE if message is ephermal than it will not auto delete.
    autoDelete: 3000, // Time in which auto delete
    content: "You are on {page} page." // The reply for interaction.
}

/**
 * @param message The message object
 * @param pages The array of pages. 
 * @param options The options for the function.
 * @param emojis The emojis to use 
 * @param time The timein which component collector ends.
 */
page(message, pages,options, ["👈", "👉"], 50000)
```

# Support
for support or issues or queries contace me on my [discord server](https://discord.gg/XYnMTQNTFh).