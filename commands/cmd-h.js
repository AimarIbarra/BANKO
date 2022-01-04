const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cmd-h")
    .setDescription("Information about the command provided.")
    .addStringOption((option) =>
      option.setName("input").setDescription("The input to echo back.")
    ),
  async execute(interaction) {
    const input = interaction.options.getString("input");
    const cmd = interaction.client.commands.get(input);
    if (!input)
      return interaction.reply(
        "Here you have the list of avaliable commands:\n-" +
          [...interaction.client.commands.keys()].join("\n-") +
          "\nType /cmd 'command' to get more information about one command"
      );
    if (!cmd) return interaction.reply("That isn't an avaliable command!");
    return interaction.reply(cmd.data.description);
  },
};
