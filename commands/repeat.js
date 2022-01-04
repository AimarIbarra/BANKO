const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription("Repeats the given string the given times.")
    .addStringOption((option) =>
      option.setName("word").setDescription("The string to repeat.")
    )
    .addStringOption((option) =>
      option.setName("spaced").setDescription("If the string is separated from its previous one (true / false -> default true)")
    )
    .addIntegerOption((option) =>
      option
        .setName("times")
        .setDescription(
          "How many times should be the string repeated (input `0` for max)."
        )
    ),
  async execute(interaction) {
    const ans = [];

    let word = interaction.options.getString("word");
    const times = interaction.options.getInteger("times");
    const spaced = interaction.options.getString("spaced");
    if (spaced != "false") word += " ";

    if (times == 0) {
      for (let i = 0; i < Math.floor(2000 / word.length); i++) {
        ans.push(word);
      }
      return interaction.reply(ans.join(""));
    }

    for (let i = 0; i < times; i++) {
      ans.push(word);
    }
    return interaction.reply(ans.join(""));
  },
};
