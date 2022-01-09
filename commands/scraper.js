const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");
const { password, user } = require("../config.json");
const fs = require("fs").promises;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Bot driven messages.")
    .addStringOption((option) =>
      option
        .setName("serv")
        .setDescription(
          "The id of the server (the first number code of the url)(default this server)."
        )
    )
    .addStringOption((option) =>
      option
        .setName("chan")
        .setDescription(
          "The id of the channel (the second number code of the url)(default bot-commands channel)."
        )
    )
    .addStringOption((option) =>
      option
        .setName("email")
        .setDescription(
          "The email of the account (by default the email of Dunkan)"
        )
    )
    .addStringOption((option) =>
      option
        .setName("pass")
        .setDescription(
          "The password of the account (by default the password of Dunkan)."
        )
    )
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription('The content of the text (by default "sample text").')
    )
    .addBooleanOption((option) =>
      option
        .setName("shot")
        .setDescription(
          "true or false, decides if it is neccesary to take a screenshot and send it."
        )
    )
    .addStringOption((option) =>
      option
        .setName("dest")
        .setDescription("In what channel should be the image posted.")
    )
    .addBooleanOption((option) =>
      option
        .setName("new")
        .setDescription(
          "If the account used is different from the previous one (default false)."
        )
    ),
  async execute(interaction) {
    const serv = interaction.options.getString("serv") || "927265962728751154";
    const chan = interaction.options.getString("chan") || "927322681269964800";
    const email = interaction.options.getString("email") || user;
    const pass = interaction.options.getString("pass") || password;
    const text = interaction.options.getString("text") || "sample text";
    const shot = interaction.options.getBoolean("shot");
    const dest = interaction.options.getString("dest") || "927322681269964800";

    const channel = interaction.client.channels.cache.get(dest);

    const puppeteer = require("puppeteer");

    (async () => {
      const browser = await puppeteer.launch({
        headless: false,
      });
      const page = await browser.newPage();

      try {
        await page.goto(`https://discord.com/channels/${serv}/${chan}`, {
          timeout: 0,
        });

        channel.send(
          `Dunkan went to https://discord.com/channels/${serv}/${chan}`
        );

        await page.waitForSelector(".input-cIJ7To");
        const selectors = await page.$$(".input-cIJ7To");
        await selectors[1].type(email);
        await selectors[2].type(pass);
        await page.click(".lookFilled-1Gx00P");

        await page.waitForSelector(".slateTextArea-1Mkdgw", { timeout: 0 });
        await channel.send(`Dunakn is about to type "${text}"`);
        await page.type(".slateTextArea-1Mkdgw", text);
        await page.keyboard.press("Enter");
        await channel.send("Dunkan sent the message.");

        if (shot) {
          await page.screenshot({ path: "./image.jpg" });
          await channel.send("Screenshot taken.");
          channel
            .send({
              files: [
                {
                  attachment: "./image.jpg",
                  name: "image.jpg",
                },
              ],
            })
            .then("Screenshot sent.");
        }
      } catch (err) {
        await channel.send(`A wild error! ${err}`);
      }

      setTimeout(async () => {
        await browser.close();
      }, 1000);

      await channel.send("Operation completed, a new operation can start.");
    })();
    await interaction.reply("Operation started.");
    setTimeout(async () => {
      await interaction.deleteReply();
    }, 5000);
    return;
  },
};
