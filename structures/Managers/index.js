const { Guild } = require('./guilds');
      
class Managers {
   constructor(client) {
      this.guildManager = new Guild(client).initTable()
   }
}
exports.Managers = Managers;