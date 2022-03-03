const { Logger } = require('advanced-command-handler');
module.exports = {
   sleep: ms => new Promise(resolve => setTimeout(resolve, ms)),
   updateOrCreate(model, where, newItem) {
      return new Promise((resolve, reject) => {
         model.findOne({ where }).then((foundItem) => {
            if (!foundItem)
               model.create(newItem).then((item) => resolve({ item, created: true })).catch(e => { reject(e) })
            else
               model.update(newItem, { where }).then((item) => resolve({ item, created: false })).catch(e => { reject(e) })
         }).catch(e => reject(e))
      })
   },

   async loadTable(manager, data = {}) {
      await this.sleep(500)
      manager.client.database.models[data.model].sync()
      for await (const element of (await manager.client.database.models[data.model].findAll())) {
         if (manager.client.guilds.cache.has(element.get('guildId')) && data.model !== 'blacklist' && data.model !== 'backup') {
            manager[data.add](data.key.map(k => k.startsWith("{") && k.endsWith("}") ? element[k.slice(1, -1)] : k).join(''), element.get());
         } else manager[data.add](data.key.map(k => k.startsWith("{") && k.endsWith("}") ? element[k.slice(1, -1)] : k).join(''), element.get());
      }
      Logger.log(`${Logger.setColor(`red`, `Successfully loaded ${manager.size} ${data.model.charAt(0).toUpperCase()}${data.model.slice(1)}`)}`, 'LOADED DATABASE')
      return manager;
   },
   checkIfPermHasCmd(commandName, permsCommand) {
      const result = { permToHave: 0, permHasCommand: false }
      for (let i = 1; i <= 4; i++) {
         for (const commands of permsCommand[`perm${i}`]) {
            if (commands.includes(commandName)) {
               result.permToHave = i
               result.permHasCommand = true
            }
         }
      }
      return result;
   },
   copyObject(object) {
      return JSON.parse(JSON.stringify(object));
   },

   roleHasSensiblePermissions(permissions) {
      return permissions.has(268566598n);
   },

   enableEmoji(enable) {
      return enable ? '<:enable:944681265989287976>' : '<:disable:944681313640796160>'
   },

   checkDeletedGuildsDuringOffline(manager) {
      manager.guildManager.filter(g => !manager.OneForAll.guilds.cache.has(g.where.guildId)).forEach(g => {
         g.deleteGuild()
         manager.client.Logger.info(`${g.where.guildId} was leave during offline`)
      });
   },

   checkCreatedGuildDuringOffline(manager) {
      manager.client.guilds.cache.filter(guild => !manager.has(guild.id)).forEach(g => {
         manager.client.Logger.info(`${g.name} ${g.id} was added during offline`)
         manager.getAndCreateIfNotExists(g.id).save()
      })
   },

}