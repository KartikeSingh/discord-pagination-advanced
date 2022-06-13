const { CommandInteraction, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed, MessageButtonStyle } = require("discord.js");
const { fixData, verify } = require("./utility");

const defaultEmojis = ["⬅", "➡", "❌"];
const defaultConfig = [
    {
        label: "",
        style: "SECONDARY"
    },
    {
        label: "",
        style: "SECONDARY"
    },
    {
        label: "",
        style: "SECONDARY"
    }
];

/**
 * Easily create pagination of embeds / text messages.
 * @param {Message | CommandInteraction | Interaction} message The message, note it should have channel and a User/Author object.
 * @param {Array<MessageEmbed | String>} embeds The array or embeds or string.
 * @param {Options} options The options of pagination.
 */
module.exports = async function pagination(message, embeds, options = {}) {
    const defaultFilter = (i) => i.user.id === (message.author?.id || message.user?.id);

    const { buttonConfig = defaultConfig, emojis = defaultEmojis, timeout = 60000, deleteMessage = false, editReply = false, ephemeral = false, filter = defaultFilter } = options;

    const verification = verify(message, embeds, emojis, timeout, deleteMessage, editReply, ephemeral, filter);

    if (verification.error) throw new Error(verification.message);

    let index = 0, row = new MessageActionRow(), data = { components: [row], content: null, embeds: [] };;

    for (let i = 0; i < 3; i++)data.components[0].addComponents(
        new MessageButton({
            customId: `${i + 1}_embed_button`,
            style: buttonConfig[i]?.style || "SECONDARY",
            emoji: emojis[i] || defaultEmojis[i],
            label: buttonConfig[i]?.label || defaultConfig[i].label,
        })
    );

    try {
        typeof (embeds[index]) === "string" ? data.content = embeds[index] : data.embeds = [embeds[index]];

        if (ephemeral) data.ephemeral = true;

        const msg = await message[message.replied || message.deferred ? editReply ? "editReply" : "followUp" : "reply"](data);

        const collector = msg.createMessageComponentCollector({ time: timeout, message: msg, filter: filter || defaultFilter })

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

        collector.on('end', async (s, r) => {
            if (deleteMessage) return await msg.delete().catch(e => { console.log(e); });

            msg.edit({
                components: data.components.map(x => {
                    x.components = x.components.map(v => {
                        v.disabled = true;

                        return v;
                    });

                    return x;
                })
            });
        });
    } catch (e) {
        console.log(e);
        throw new Error("I was unable to send/edit embed either the client do not have permission to send message or Invalid embed was provided\nError:");
    }
}

/**
 * @typedef Options The options to control the pagination
 * @property {Array<String>} emojis The emojis to use for the button
 * @property {Number} timeout The time for which pagination stays active
 * @property {Array<{label: String, style:MessageButtonStyle }>} buttonConfig
 * @property {Boolean} deleteMessage Do you want to delete the pagination message after it ends
 * @property {Boolean} editReply Do you want to edit the interaction message for the pagination
 * @property {Boolean} ephemeral Do you want to the reply to be ephemeral or not
 * @property {Function} filter The interaction listener filter
 */