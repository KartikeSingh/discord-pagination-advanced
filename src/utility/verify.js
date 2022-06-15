module.exports = (message, embeds, emojis, timeout, a, b, c, f) => {
    if (!message
        || !message.channel
        || !message.channel.send
        || (!message.author && !message.user)
    ) throw new Error("Invalid message was provided, It do not have either channel / user obkect attached to it");

    if (!embeds || !Array.isArray(embeds) || embeds.length === 0) throw new Error("Embeds aren't an array or have 0 embeds in it.");

    for (let i = 0; i < embeds.length; i++) {
        const v = embeds[i];
        if (!v || (typeof v !== "string" && typeof (v) !== "object")) embeds = embeds.filter(_v => _v !== v);
    }

    if (embeds.length === 0) throw new Error("Embeds do not have any valid embed in it.");

    if (!emojis || !Array.isArray(emojis) || emojis.length < 2) throw new Error("Please either provide two emojis or don't proived anything at all");

    for (let i = 0; i < emojis.length; i++) {
        const _v = emojis[i];
        if (typeof (_v) !== "string") emojis = emojis.filter(v => v !== _v)
    }

    if (emojis.length === 0) throw new Error("Emojis do not have any valid emoji in it.");

    if (!timeout || typeof (timeout) !== "number" || timeout < 100) throw new Error("Timeout should be a number and at least 100");

    if (typeof (a) !== "boolean") throw new Error("messageDelete option should be either true or boolean but recived " + JSON.stringify(a));

    if (typeof (b) !== "boolean") throw new Error("messageDelete option should be either true or boolean but recived " + JSON.stringify(b));
    
    if (typeof (c) !== "boolean") throw new Error("ephemeral option should be either true or boolean but recived " + JSON.stringify(c));
    
    if (typeof (f) !== "function") throw new Error("filter option should be function but recived " + JSON.stringify(c));
}
