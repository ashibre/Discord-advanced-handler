const fs = require('fs');
class EventHandler {
    constructor(client) {
        this.client = client;
        this.getFiles("events")
    }
    getFiles(path) {
        fs.readdir(`${path}`, (err, files) => {
            if (err) throw err;
            files.forEach(file => {

                if (file.endsWith('.disabled')) return;
                if (file.endsWith('.js')) {
                    return this.registerFile(`${path}/${file}`, this.client);
                }
                if (!file.includes("."))
                    this.getFiles(`${path}/${file}`);
            })
        })
    }

    registerFile(file) {
        const event = require(`../../${file}`);
        this.client.on(event.name, (...args) => event.run(this.client, ...args));
        delete require.cache[require.resolve(`../../${file}`)];
    }
}

class CommandHandler {
    constructor(client) {
        this.client = client;
        this.getFiles("commands");
    }

    getFiles(path) {
        fs.readdir(`${path}`, (err, files) => {
            if (err) throw err;
            files.forEach(file => {
                if (file.endsWith('.disabled')) return;
                if (file.endsWith('.js')) {
                    return this.registerFile(`${path}/${file}`, this.client)
                }
                if (!file.includes("."))
                    this.getFiles(`${path}/${file}`);
            })
        })
    }

    registerFile(file) {
        const pull = require(`../../${file}`);
        if (pull.name)
            this.client.commands.set(pull.name.toLowerCase(), pull);
            delete require.cache[require.resolve(`../../${file}`)];
        if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => this.client.aliases.set(alias.toLowerCase(), pull.name));
    }
}

module.exports = { EventHandler, CommandHandler }
