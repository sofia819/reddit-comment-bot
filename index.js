require("dotenv").config();
const Discord = require("discord.js");
const fetch = require("node-fetch");
const client = new Discord.Client();
const { formatApiEndpoint, getRandomElement, filterArgs } = require("./utils");
const { COMMAND_PREFIX, MAX_COMMENT_LENGTH } = require("./constants");

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
          const filteredResults = data.filter(
            ({ body }) => body.length < MAX_COMMENT_LENGTH
          );
          if (filteredResults.length > 0) {
            message.channel.send(getRandomElement(filteredResults).body);
          }
        });
    }
  }
});
