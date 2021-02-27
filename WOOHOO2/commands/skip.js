const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "skip",
  aliases: ["s"],
  description: "Skip the currently playing song",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue)
      return message.reply("There is nothing playing that I could skip for you.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    queue.playing = true;
    queue.connection.dispatcher.end();
    let skipEmbed = new MessageEmbed()
      .setTitle(`**Skipped*`)
      .setDescription(`${message.author} skipped the song.`)
      .setColor("#F8AA2A");
    queue.textChannel.send(skipEmbed).catch(console.error);
  }
};
