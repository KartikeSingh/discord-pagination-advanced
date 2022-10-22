module.exports = (message, embeds, { timeout, deleteMessage, editReply, ephemeral, filter, pageSkip, logs,removeComponent }) => {
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

    if (!timeout || typeof timeout !== "number" || timeout < 100) throw new TypeError("Timeout should be a number and at least 100")

    if (typeof deleteMessage !== "boolean") throw new TypeError("messageDelete option should be either true or boolean but recived " + JSON.stringify(deleteMessage))

    if (typeof editReply !== "boolean") throw new TypeError("editReply option should be either true or boolean but recived " + JSON.stringify(editReply))

    if (typeof ephemeral !== "boolean") throw new TypeError("ephemeral option should be either true or boolean but recived " + JSON.stringify(ephemeral))

    if (typeof pageSkip !== "boolean") throw new TypeError("pageSkip option should be either true or boolean but recived " + JSON.stringify(pageSkip))

    if (typeof logs !== "boolean") throw new TypeError("logs option should be either true or boolean but recived " + JSON.stringify(logs))

    if (typeof removeComponent !== "boolean") throw new TypeError("removeComponent option should be either true or boolean but recived " + JSON.stringify(removeComponent))

    if (typeof filter !== "function") throw new TypeError("filter option should be function but recived " + JSON.stringify(filter))
    
    return true;
}