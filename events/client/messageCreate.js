const { MessageEmbed } = require('discord.js')
module.exports = {
   name: 'messageCreate',
   run: async (client, message) => {
      let guildData = client.managers.guildManager.getAndCreateIfNotExists(message.guild.id)
      const prefix = guildData.get('prefix'); const color = guildData.get('color');
      if (message.author.bot || message.system || !message.guild || !message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g)
      const cmd = client.commands.get(args[0].toLowerCase().normalize()) || client.commands.get(client.aliases.get(args[0].toLocaleLowerCase().normalize()));
      args.shift();

      if (cmd) {
         //user
         let emb = new MessageEmbed().setDescription(`Tu n'as pas la permission \`${cmd.userPermissions || []}\``).setColor('#FF0000')
         if (!message.member.permissions.has(cmd.userPermissions || [])) return message.channel.send({ embeds : [emb] })

         // client
         let emb1 = new MessageEmbed().setDescription(`Je n'ai pas la permission \`${cmd.clientPermissions || []}\``).setColor('#FF0000')
         if (!message.guild.me.permissions.has(cmd.clientPermissions || [])) return message.channel.send({ embeds : [emb1] })

         await cmd.run(client, message, args, prefix, color);
      }
   }
}