module.exports = {
   name: 'nuke',
   description: 'Renew a channel',
   aliases: ['renew'],
   userPermissions: ['MANAGE_CHANNELS'],
   clientPermissions: ['MANAGE_CHANNELS', 'EMBED_LINKS', 'SEND_MESSAGES'],

   run: async (client, message, args, prefix, color) => {
      if (!message.guild) return;
      await message.channel.clone({ reason: `Nuke par ${message.author.tag} (${message.author.id})` }).then(c => c.setPosition(message.channel.position) && c.send(`La purge réclamé par <@${message.author.id}> a été effectuée.`))
      message.channel.delete([`Nuke par ${message.author.tag} (${message.author.id})`])
   }
}