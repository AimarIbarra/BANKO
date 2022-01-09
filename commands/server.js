const { SlashCommandBuilder } = require("@discordjs/builders");
const {MessageEmbed} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server")
    .setDescription("The rules of the server.")
    .addStringOption((option) =>
      option.setName("serv").setDescription("The id of the server to share")
    ),
  async execute(interaction) {
    const server = `https://disboard.org/server/${interaction.options.getString("serv")}`;
    const exampleEmbed = new MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Test')
	.setURL(server)
	.setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/AfFp7pu.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/AfFp7pu.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/AfFp7pu.png');

    return interaction.reply({ embeds: [exampleEmbed] })
  },
};