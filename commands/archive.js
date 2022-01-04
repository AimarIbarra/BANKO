const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("archive")
    .setDescription("Posts one of the many trollings.")
    .addStringOption((option) =>
      option.setName("p").setDescription("The parameters for the query. (input \`r\` for random)")
    ),
  async execute(interaction) {
    const p = interaction.options.getString("p");
    let img = "last image uploaded!";
    if(p == "r") img = "https://imgur.com/gallery/5uWtc";
    
    return interaction.reply({content: img , ephemeral: true});
  },
};