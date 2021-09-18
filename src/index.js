const { CommandInteraction, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const verify = require('./utility/verify');

/**
 * Easily create pagination of embeds / text messages.
 * @param {Message | CommandInteraction | Interaction} message The message, note it should have channel and a User/Author object.
 * @param {Array<MessageEmbed | String>} embeds The array or embeds or string.
 * @param {{content:String,ephemeral:Boolean,autoDelete:Number}} options The options.
 * @param {Array<String>} emojis The emojis to use.
 * @param {Number} timeout time till the message collector works.
 */
module.exports = async function pagination(message, embeds, options = {}, emojis = ["⬅", "➡"], timeout = 60000) {
    const verification = verify(message, emojis, emojis, timeout);

    if (verification.error) throw new Error(verification.message);

    let index = 0, row = new MessageActionRow(), data;

    row.addComponents([
        new MessageButton().setCustomId("1_embed_page").setStyle("PRIMARY").setEmoji(emojis[0]),
        new MessageButton().setCustomId("2_embed_page").setStyle("PRIMARY").setEmoji(emojis[1])
    ]);

    try {
        data = { components: [row] };
        typeof (embeds[index]) === "string" ? data.content = embeds[index] : data.embeds = [embeds[index]];

        const msg = await message.channel?.send(data);

        const collector = msg.createMessageComponentCollector({ time: timeout, message: msg, filter: (i) => i.message.id === msg.id && i.user.id === message?.author?.id || message?.user?.id })

        collector.on('collect', async (i) => {
            if (i.customId[0] === "1") index--;
            if (i.customId[0] === "2") index++;

            if (index < 0) index = embeds.length - 1;
            if (index >= embeds.length) index = 0;

            data = { components: [row] };

            if (typeof (embeds[index]) === "string") {
                data.content = embeds[index];
                data.embeds = []
            } else {
                data.embeds = [embeds[index]];
                data.content = "\u200b";
            }

            msg.edit(data);

            const _msg = await i.reply({ content: options?.content?.replace(/{page}/g, index + 1) || `Switched to page ${index + 1}.`, ephemeral: typeof (options?.ephemeral) === "boolean" ? options?.ephemeral : true, fetchReply: typeof (options?.ephemeral) === "boolean" ? options?.ephemeral ? false : true : false });


            if (options?.ephemeral === false) setTimeout(() => {
                msg.channel.messages.delete(_msg);
            }, options.autoDelete || 3000);
        })
    } catch (e) {
        throw new Error("I was unable to send/edit embed either the client do not have permission to send message or Invalid embed was provided");
    }
}