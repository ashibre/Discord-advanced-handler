module.exports = {
   name: 'setprefix',
   description: 'Set a new prefix for the server',
   aliases: ['sp'],
   userPermissions: ['ADMINISTRATOR'],
   clientPermissions: ["SEND_MESSAGES"],

   run: async (client, message, args) => {
      const guildData = client.managers.guildManager.getAndCreateIfNotExists(message.guild.id);
      const newPrefix = args[0];
      if(!newPrefix) return message.reply(`Veuillez saisir un préfix`)
      if(newPrefix > 2) return message.reply(`Le prefix ne peut être supérieur a 2 caracteres`)
      if(newPrefix === guildData.get('prefix')) return message.reply(`Le prefix ne peut pas être le même que celui actuel`)
      guildData.set('prefix', newPrefix).save().then(() => {
         message.channel.send(`Le nouveau prefix est ${newPrefix}`)
      })
   }
}