const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("math")
    .setDescription(
      "Make the bot do math, remember that computers are bad at math."
    )
    .addStringOption((option) =>
      option
        .setName("task")
        .setDescription(
          "What should be done (what should be done with the given numbers, e.g. '+', '-', 'pow')"
        )
        .addChoices([
          ["+", "+"],
          ["-", "-"],
          ["*", "*"],
          ["/", "/"],
          ["%", "%"],
          ["to the power", "pow"],
          ["Round", "round"],
          ["Floor", "floor"],
          ["Ceil", "ceil"],
          ["PI", "pi"],
          ["Random", "rand"],
        ])
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("n1").setDescription("The first number of the task.")
    )
    .addStringOption((option) =>
      option.setName("n2").setDescription("The second number of the task.")
    ),
  async execute(interaction) {
    const task = interaction.options.getString("task");
    const n1 = parseFloat(interaction.options.getString("n1"));
    const n2 = parseFloat(interaction.options.getString("n2"));
    let ans;

    switch (task) {
      case "+":
        ans = (n1 + n2).toString();
        break;
      case "-":
        ans = (n1 - n2).toString();
        break;
      case "*":
        ans = (n1 * n2).toString();
        break;
      case "/":
        ans = (n1 / n2).toString();
        break;
      case "%":
        ans = (n1 % n2).toString();
        break;
      case "pow":
        ans = Math.pow(n1, n2).toString();
        break;
      case "round":
        ans = ["n1: " + Math.round(n1), "n2: " + Math.round(n2)].join("\n");
        break;
      case "floor":
        ans = ["n1: " + Math.floor(n1), "n2: " + Math.floor(n2)].join("\n");
        break;
      case "ceil":
        ans = ["n1: " + Math.ceil(n1), "n2: " + Math.ceil(n2)].join("\n");
        break;
      case "pi":
        ans = Math.PI.toString();
        break;
      case "rand":
        ans = Math.floor(Math.random() * (n2 - n1 + 1) + n1);
        break;
    }
    return interaction.reply(ans);
  },
};
