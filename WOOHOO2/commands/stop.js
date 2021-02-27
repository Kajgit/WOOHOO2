const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "stop",
  description: "Stops the music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);

    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    let stopEmbed = new MessageEmbed()
      .setTitle(`**Stopped music**`)
      .setDescription(`${message.author} stopped the music!`)
      .setColor("#F8AA2A");

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(stopEmbed).catch(console.error);
  }
};
