const Discord = require('discord.js')

module.exports = (message, embeds, emojis, timeout) => {
    if (!message
        || !message.channel
        || !message.channel.send
        || (!message.author && !message.user)
    ) return { error: true, message: "Invalid message was provided, It do not have either channel / user obkect attached to it" };

    if (!embeds || !Array.isArray(embeds) || embeds.length === 0) return { error: true, message: "Embeds aren't an array or have 0 embeds in it." }

    for (let i = 0; i < embeds.length; i++) {
        const v = embeds[i];
        if (!v || (typeof v !== "string" && typeof (v) !== "object")) embeds = embeds.filter(_v => _v !== v);
    }

    if (embeds.length === 0) return { error: true, message: "Embeds do not have any valid embed in it." };

    if (!emojis || !Array.isArray(emojis) || emojis.length < 2) return { error: true, message: "Please either provide two emojis or don't proived anything at all" };

    for (let i = 0; i < emojis.length; i++) {
        const _v = emojis[i];
        if (typeof (_v) !== "string") emojis = emojis.filter(v => v !== _v)
    }

    if (emojis.length === 0) return { error: true, message: "Emojis do not have any valid emoji in it." };

    if (!timeout || typeof (timeout) !== "number" || timeout < 100) return { error: true, message: "Timeout should be a number and at least 100" };

    return { error: false };
}