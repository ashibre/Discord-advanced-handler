module.exports = {
   name: 'ready',

   run: async (client) => {
         let statuses = `https://github.com/ashibre`

         client.user.setActivity({
            name: statuses,
            type: "STREAMING",
            url: "https://www.twitch.tv/ashibre"
         })
      client.Logger.event(`${client.Logger.setColor('green')} ${client.user.tag} has log`, 'CLIENT LOGIN');
   }
}