module.exports = (message, embeds, { emojis, timeout, deleteMessage, editReply, ephemeral, filter, pageSkip }) => {
    if (!message
        || !message.channel
        || !message.channel.send
        || (!message.author && !message.user)
    ) throw new TypeError("Invalid message was provided, It do not have either channel / user object attached to it")

    if (!embeds || !Array.isArray(embeds) || embeds.length === 0) throw new TypeError("Embeds aren't an array or have 0 embeds in it.")

    for (let i = 0; i < embeds.length; i++) {
        const v = embeds[i];
        if (!v || (typeof v !== "string" && typeof v !== "object")) embeds = embeds.filter(_v => _v !== v);
    }

    if (embeds.length === 0) throw new TypeError("Embeds do not have any valid embed in it.")

    if (!emojis || !Array.isArray(emojis) || emojis.length < 2) throw new TypeError("Please either provide two emojis or don't proived anything at all")

    for (let i = 0; i < emojis.length; i++) {
        const _v = emojis[i];
        if (typeof _v !== "string") emojis = emojis.filter(v => v !== _v)
    }

    if (emojis.length === 0) throw new TypeError("Emojis do not have any valid emoji in it.")

    if (!timeout || typeof timeout !== "number" || timeout < 100) throw new TypeError("Timeout should be a number and at least 100")

    if (typeof deleteMessage !== "boolean") throw new TypeError("messageDelete option should be either true or boolean but recived " + JSON.stringify(a))

    if (typeof editReply !== "boolean") throw new TypeError("editReply option should be either true or boolean but recived " + JSON.stringify(b))

    if (typeof ephemeral !== "boolean") throw new TypeError("ephemeral option should be either true or boolean but recived " + JSON.stringify(c))

    if (typeof pageSkip !== "boolean") throw new TypeError("pageSkip option should be either true or boolean but recived " + JSON.stringify(c))

    if (typeof filter !== "function") throw new TypeError("filter option should be function but recived " + JSON.stringify(c))

    return true;
}