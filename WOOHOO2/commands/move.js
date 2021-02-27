const move = require("array-move");
const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "move",
  aliases: ["mv"],
  description: "Move songs around in the queue",
  execute(message, args) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (!args.length) return message.reply(`Usage: ${message.client.prefix}move <Queue Number>`);
    if (isNaN(args[0]) || args[0] <= 1) return message.reply(`Usage: ${message.client.prefix}move <Queue Number>`);

    let song = queue.songs[args[0] - 1];

    var songEmbed1 = new discord.MessageEmbed()
        .setTitle(`**Moved ${song.title}**`)
        .setColor("#1c1c1c")
        .addField("Moved:", song.title)
        .addField("To:", args[1] == 1 ? 1 : args[1] - 1)
        .setFooter("By:", message.author)
        .setTimeStamp()

    queue.songs = move(queue.songs, args[0] - 1, args[1] == 1 ? 1 : args[1] - 1);
    queue.textChannel.send(
      songEmbed1
    );
  }
};
