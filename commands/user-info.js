const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("Get information about an user.")
    .addStringOption((option) =>
      option
        .setName("account_id")
        .setDescription("The id of the user you want to get info about.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const param = interaction.options.getString("account_id").replace(/[^0-9]/g, "");
    const acc = await interaction.client.users.fetch(param);

    const exampleEmbed = new MessageEmbed()
      .setColor("#0099ff")
      .setTitle("Information about this account:")
      .setAuthor({
        name: acc.tag,
        iconURL: acc.avatarURL({dynamic: true}),
      })
      .setThumbnail(acc.avatarURL({dynamic: true}))
      .addFields(
        { name: "Username:", value: acc.username, inline: true },
        { name: "Discriminator:", value: acc.discriminator, inline: true },
        { name: "Id:", value: acc.id.toString(), inline: true },
        { name: "Bot:", value: acc.bot.toString(), inline: true },
        {
          name: "Creation date:",
          value: acc.createdAt.toString(),
          inline: true,
        },
        { name: "Age in years:", value: Math.round((Date.now() - acc.createdAt.getTime()) / 365 / 24 / 60 / 60 / 1000).toString(), inline: true },
        { name: "Age in months:", value: Math.round((Date.now() - acc.createdAt.getTime()) / 30 / 24 / 60 / 60 / 1000).toString(), inline: true },
        { name: "Age in days:", value: Math.round((Date.now() - acc.createdAt.getTime()) / 24 / 60 / 60 / 1000).toString(), inline: true },
        {name: "Pfp URL:", value: acc.avatarURL(), inline: true}
      );

    return interaction.reply({ embeds: [exampleEmbed] });
  },
};
