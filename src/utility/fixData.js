module.exports = (data, embeds, index) => {
    if (typeof (embeds[index]) === "string") {
        data.content = embeds[index];
        data.embeds = []
    } else {
        data.embeds = [embeds[index]];
        data.content = "\u200b";
    }

    return data;
    
}