const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription("Repeats the given string the given times.")
    .addStringOption((option) =>
      option.setName("word").setDescription("The string to repeat.")
    )
    .addBooleanOption((option) =>
      option.setName("spaced").setDescription("If the string is separated from its previous one (true / false -> default true)")
    )
    .addIntegerOption((option) =>
      option
        .setName("times")
        .setDescription(
          "How many times should be the string repeated (input `0` for max)."
        )
    )
    .addStringOption((option) =>
      option
        .setName("amount")
        .setDescription(
          "How many messages should it send (max 10 for safety reasons)."
        )
    ),
  async execute(interaction) {
    const ans = [];

    let word = interaction.options.getString("word");
    const times = interaction.options.getInteger("times");
    const spaced = interaction.options.getBoolean("spaced") || true;
    const amount = parseInt(interaction.options.getString("amount")) || 1;
    if (spaced) word += " ";

    if (times == 0) {
      for (let i = 0; i < Math.floor(2000 / word.length); i++) {
        ans.push(word);
      }
    }

    for (let i = 0; i < times; i++) {
      ans.push(word);
    }

    const text = ans.join("");
    const channel = interaction.client.channels.cache.get("927322681269964800");

    for(let i = 0; i < amount; i++) {
      await channel.send(text);
    }

    return interaction.reply({content: "Messages on their way", ephemeral: true});
  },
};
