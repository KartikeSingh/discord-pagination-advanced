const { CommandInteraction, Interaction, Message, MessageActionRow, MessageButton, MessageEmbed, MessageButtonStyle, InteractionCollector } = require("discord.js");
const { fixData, verify } = require("./utility");

const defaultConfig_1 = [
    {
        label: "",
        style: "SECONDARY",
        emoji: "⏪"
    },
    {
        label: "",
        style: "SECONDARY",
        emoji: "⬅"
    },
    {
        label: "",
        style: "SECONDARY",
        emoji:"❌"
    }
];

const defaultConfig_2 = [
    {
        label: "",
        style: "SECONDARY",
        emoji: "⏪"
    },
    {
        label: "",
        style: "SECONDARY",
        emoji: "⬅"
    },
    {
        label: "",
        style: "SECONDARY",
        emoji: "❌"
    },
    {
        label: "",
        style: "SECONDARY",
        emoji: "➡"
    },
    {
        label: "",
        style: "SECONDARY",
        emoji: "⏩"
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

    const { buttonConfig = defaultConfig, timeout = 60000, deleteMessage = false, editReply = false, ephemeral = false, filter = defaultFilter, pageSkip = false } = options;

    verify(message, embeds, options);

    let index = 0, row = new MessageActionRow(), data = { components: [row], content: null, embeds: [], fetchReply: true };;

    const defaultConfig = pageSkip ? defaultConfig_2 : defaultConfig_1;

    for (let i = 0; i < 3; i++)data.components[0].addComponents(
        new MessageButton({
            customId: `${i + 1}_embed_button`,
            style: buttonConfig[i]?.style || "SECONDARY",
            emoji: buttonConfig[i]?.emoji || defaultConfig[i].emoji,
            label: buttonConfig[i]?.label || defaultConfig[i].label,
        })
    );

    try {
        typeof (embeds[index]) === "string" ? data.content = embeds[index] : data.embeds = [embeds[index]];

        if (ephemeral) data.ephemeral = true;

        const msg = await message[message.replied || message.deferred ? editReply ? "editReply" : "followUp" : "reply"](data);

        const collector = new InteractionCollector(message.client, {
            filter: filter || defaultFilter,
            channel: message.channel,
            time: timeout,
            componentType: "BUTTON",
        });

        collector.on('collect', async (i) => {
            if (!i.isButton() || i.message.id !== msg?.id) return;

            const id = i.customId[0];

            if (id === "1") index = 0;
            else if (id === "2") index--;
            else if (id === "4") index++;
            else if (id === "5") index = embeds.length - 1;
            else {
                collector.stop("goodEnd");
                return i.update(fixData(data, embeds, 0));
            }

            index = index < 0 ? embeds.length - 1 : index >= embeds.length ? index = 0 : index;

            i.update(fixData(data, embeds, index));
        });

        collector.on('end', async (s, r) => {
            if (ephemeral) return;

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
 * @property {Number} timeout The time for which pagination stays active
 * @property {Array<{label: string, style:MessageButtonStyle, emoji: string }>} buttonConfig
 * @property {Boolean} pageSkip Do you want page skip buttons
 * @property {Boolean} deleteMessage Do you want to delete the pagination message after it ends
 * @property {Boolean} editReply Do you want to edit the interaction message for the pagination
 * @property {Boolean} ephemeral Do you want to the reply to be ephemeral or not
 * @property {Function} filter The interaction listener filter
 */