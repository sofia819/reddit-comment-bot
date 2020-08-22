require("dotenv").config();
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
const {
  formatApiEndpoint,
  getRandomElement,
  filterArgs,
  filterResults,
  printLog,
} = require("./utils");
const { COMMAND_PREFIX, FIFTEEN_MINUTES } = require("./constants");

client.once("ready", () => {
  console.log("DPS Bot is ready!");
});

client.login(process.env.BOT_TOKEN);

client.on("message", async (message) => {
  if (!message.author.bot && message.content.startsWith(COMMAND_PREFIX)) {
    const args = filterArgs(message);
    if (args.length > 0) {
      const keyword = getRandomElement(args);
      await fetch(formatApiEndpoint(keyword))
        .then((res) => res.json())
        .then(({ data }) => {
          const filteredResults = filterResults(data, keyword);
          if (filteredResults.length > 0) {
            const result = getRandomElement(filteredResults);
            printLog(keyword, result);
            message.channel.send(result.body);
          }
        });
    }
  }
});

client.on("ready", () => {
  setInterval(() => {
    console.log("It has been 15 minutes");
  }, FIFTEEN_MINUTES);
});
