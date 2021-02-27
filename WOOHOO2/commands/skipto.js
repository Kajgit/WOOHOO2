const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skipto",
  aliases: ["st"],
  description: "Skip to the selected queue number",
  execute(message, args) {
    if (!message.author.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permssion for that.");
    if (!args.length || isNaN(args[0]))
      return message
        .reply(`Usage: ${message.client.prefix}${module.exports.name} <Queue Number>`)
        .catch(console.error);

    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    if (args[0] > queue.songs.length)
      return message.reply(`The queue is only ${queue.songs.length} songs long!`).catch(console.error);

    queue.playing = true;

    if (queue.loop) {
      for (let i = 0; i < args[0] - 2; i++) {
        queue.songs.push(queue.songs.shift());
      }
    } else {
      queue.songs = queue.songs.slice(args[0] - 2);
    }

    let skipToEmbed = new MessageEmbed()
      .setTitle(`**Skipped songs**`)
      .setDescription(`${message.author} skipped ${args[0] - 1} songs`)
      .setColor("#F8AA2A");

    queue.connection.dispatcher.end();
    queue.textChannel.send(skipToEmbed).catch(console.error);
  }
};
