const { CommandInteraction, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { fixData, verify } = require("./utility");

/**
 * Easily create pagination of embeds / text messages.
 * @param {Message | CommandInteraction | Interaction} message The message, note it should have channel and a User/Author object.
 * @param {Array<MessageEmbed | String>} embeds The array or embeds or string.
 * @param {Array<String>} emojis The emojis to use.
 * @param {Number} timeout time till the message collector works.
 */
module.exports = async function pagination(message, embeds, emojis = ["⬅", "➡", "❌"], timeout = 60000) {
    const verification = verify(message, embeds, emojis, timeout);

    if (verification.error) throw new Error(verification.message);

    let index = 0, row = new MessageActionRow(), data = { components: [row], content: null, embeds: [] };;

    data.components[0].addComponents([
        new MessageButton().setCustomId("1_embed_page").setStyle("PRIMARY").setEmoji(emojis[0]),
        new MessageButton().setCustomId("2_embed_page").setStyle("PRIMARY").setEmoji(emojis[1]),
        new MessageButton().setCustomId("3_embed_page").setStyle("DANGER").setEmoji(emojis[2])
    ]);

    try {
        typeof (embeds[index]) === "string" ? data.content = embeds[index] : data.embeds = [embeds[index]];

        const msg = await message[message.replies ? "followUp" : "reply"](data);

        const collector = msg.createMessageComponentCollector({ time: timeout, message: msg, filter: (i) => i.message.id === msg.id && i.user.id === message?.author?.id || message?.user?.id })

        collector.on('collect', async (i) => {
            if (i.customId[0] === "1") index--;
            else if (i.customId[0] === "2") index++;
            else {
                collector.stop("goodEnd");
                return i.update(fixData(data, embeds, 0));
            }

            index = index < 0 ? embeds.length - 1 : index >= embeds.length ? index = 0 : index;

            i.update(fixData(data, embeds, index));
        });

        collector.on('end', () => {
            data.components[0].components.forEach(v => v.setDisabled(true));
            msg.edit({ components: data.components });
        });
    } catch (e) {
        throw new Error("I was unable to send/edit embed either the client do not have permission to send message or Invalid embed was provided");
    }
}