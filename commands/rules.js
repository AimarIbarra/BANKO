const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("The rules of the server.")
    .addIntegerOption((option) =>
      option.setName("rule").setDescription("The number of the rule you want to see.")
    ),
  async execute(interaction) {
    const rules = [
        "Rule 1: Do some trolling",
        "Rule 2: Fuck Dragon (Gay)",
        "Rule 3: No raiding+spamming servers, that's not trolling that's being retarded and will get you banned from Discord",
        "Rule 4: DO NOT add people if we're doing group trolling. They can see our mutuals and might catch on",
        "Rule 5: Remember, ALWAYS have fun"
    ];
    if(interaction.options.getInteger("rule") != undefined) return interaction.reply(rules[interaction.options.getInteger("rule") - 1]);

    return interaction.reply(rules.join("\n"));
  },
};