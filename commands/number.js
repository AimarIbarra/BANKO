const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("number")
    .setDescription("Generate a random number in a given range with the given parameters.")
    .addIntegerOption((option) =>
      option.setName("min").setDescription("The smallest possible number (default 0)")
    )
    .addIntegerOption((option) =>
      option.setName("max").setDescription("The biggest possible number (default 10)")
    )
    .addIntegerOption((option) =>
      option.setName("dec").setDescription("The amount of decimals (default 0)")
    )
    .addIntegerOption((option) =>
      option.setName("-r").setDescription("The amount of numbers to generate (default 1)")
    ),
  async execute(interaction) {
    const obs = interaction.options;
    let max = obs.getInteger("max") || 10;
    max++;
    let min = obs.getInteger("min") || 0;
    const dec = Math.pow(10, obs.getInteger("dec")) || 1;
    const times = obs.getInteger("-r") || 1;

    const num = [];
    
    for(let i = 0; i < times; i++) num.push(Math.floor(Math.random() * (max - min) * dec) / dec + min);

    return interaction.reply("Your random number(s) sir:\n\`" + num.join(" ") + "\`");
  },
};