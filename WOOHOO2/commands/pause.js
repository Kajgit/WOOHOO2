const { canModifyQueue } = require("../util/EvobotUtil");

module.exports = {
  name: "pause",
  description: "Pause the currently playing music",
  execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member)) return;

    if (queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause(true);
      let pauseEmbed = new MessageEmbed()
      .setTitle("Paused song")
      .setDescription(`${message.author} paused the music`)
      .setColor("#1c1c1c")
      .setTimeStamp()
      return queue.textChannel.send(pauseEmbed).catch(console.error);
    }
  }
};
