module.exports = {
  name: "ping",
  cooldown: 10,
  description: "Show the bot's average ping",
  execute(message) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: You don't have permission to do this.")
    message.reply(`API Response time: ${Math.round(message.client.ws.ping)} ms`).catch(console.error);
  }
};
