# Installations
```
npm i discord-pagination-advanced
```

# What is it?
An package to easily create pagination not only for embeds but also for simple string messages, with buttons.

# Why use this?
- Fast & Advanced
- Easy & Customizable
- Good for both beginners & pros

# How ?
```js
const page = require('discord-pagination-advanced');

const pages = ["some string", aMessagEmbed, anotherEmbed, "some more string maybe"];

/**
 * @param message The message Object
 * @param pages The array of pages. 
 */
page(message, pages);
```

# Available Options
```js
/**
 * @typedef Options The options to control the pagination
 * @property {Number} timeout The time for which pagination stays active
 * @property {Array<{label: string, style:MessageButtonStyle, emoji: string }>} buttonConfig
 * @property {Boolean} pageSkip Do you want page skip buttons
 * @property {Boolean} deleteMessage Do you want to delete the pagination message after it ends
 * @property {Boolean} editReply Do you want to edit the interaction message for the pagination
 * @property {Boolean} ephemeral Do you want to the reply to be ephemeral or not
 * @property {Boolean} logs Do you want the bot to log errors, default is true
 * @property {Boolean} removeComponent Do you to remove component after the collector ends
 * @property {Function} filter The interaction listener filter
 */
```

# Examples

## Custom Filters
```js
const page = require('discord-pagination-advanced');

const pages = ["some string", aMessagEmbed, anotherEmbed,"some more string maybe"];

const options =  {
   filter: (i) => !i.user.bot // function to select people who can use the buttons
}


page(message, pages, options)
```

## Custom Buttons
```js
const page = require('discord-pagination-advanced');

const pages = ["some string", aMessagEmbed, anotherEmbed,"some more string maybe"];

const options =  {
   emojis: ["⬅", "➡", "❌"], // Emojis of the buttons
   buttonConfig: [ // Label & style (these are optional)
    {
        label: "Back",
        style: "SECONDARY"
    },
    {
        label: "Forward",
        style: "SECONDARY"
    },
    {
        label: "", // empty string is allowed
        style: "SECONDARY"
    }]
}

page(message, pages, options);

// page skip option!
const options =  {
   emojis: ["⬅", "➡", "❌", "⏮️", "⏭️",], // Emojis of the buttons
   buttonConfig: [ // Label & style (these are optional)
    {
        label: "Left",
        style: "SECONDARY",
    },
    {
        label: "Right",
        style: "SECONDARY",
    },
    {
        label: "Close",
        style: "SECONDARY",
    },
    {
        label: "Skip To First",
        style: "SECONDARY",
    },
    {
        label: "Skip To Last",
        style: "SECONDARY",
        emoji: "⏭️", // you can pass emoji here too
    }],
    pageSkip: true, // enables the 5 button mode
}

page(message, pages, options);
```

## Other Options
```js
const page = require('discord-pagination-advanced');

const pages = ["some string", aMessagEmbed, anotherEmbed,"some more string maybe"];

const options =  {
    timeout: 60000, // ms time for which buttons will stay active
    deleteMessage: true, // Whether you want to auto delete the message or not
    editReply: false, // If you wanna edit reply or send a follow up
    ephemeral: true, // If reply should be ephemeral (for interaction only)
}

page(message, pages, options)
```
# Support
for support or issues or queries contace me on my [discord server](https://discord.gg/krazydev).