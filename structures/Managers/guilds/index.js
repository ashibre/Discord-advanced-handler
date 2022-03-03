const {Collection} = require('discord.js');
class Guild extends Collection {

    constructor(client) {
        super();
        this.client = client;
        this.modelName = "guilds";
    }

    addGuild(key, values = {}) {
        return this.set(key, new GuildManager(this, {guildId: key, ...values})).get(key)
    }

    getAndCreateIfNotExists(key, values = {}) {
        return this.has(key) ? this.get(key) : this.addGuild(key, values);
    }

    getGuild(key) {
        return this.get(key);
    }

    initTable() {
        require(`./model`)(this.client.database, this.client.DataTypes, this.modelName, this.client.config);
        this.loadTable();
        return this;
    }

    loadTable() {
        return this.client.functions.loadTable(this, {
            model: this.modelName,
            key: ["{guildId}"],
            add: 'addGuild'
        })
    }
}

class GuildManager {
    constructor(guildManager, values = {}) {
        this.guildManager = guildManager;
        this.where = {
            guildId: values.guildId
        }
        this.values = {
            ...this.where,
            prefix: values.prefix ? values.prefix : this.guildManager.client.config.prefix,
        }
    }

    get(key) {
        return this.values[key]
    }

    set(key, value) {
        this.values[key] = value;
        return this
    }
    
    async save() {
        this.guildManager.client.functions.updateOrCreate(this.guildManager.client.database.models[this.guildManager.modelName], this.where, this.values).then(() => {
        }).catch((e) => { console.log(e) });
        return this;
    }
}

exports.Guild = Guild;
