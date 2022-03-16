const { Collection, Client, Intents } = require('discord.js'),
   { Sequelize, DataTypes } = require('sequelize'),
   { Managers } = require('../Managers'),
   { CommandHandler, EventHandler } = require('./handler'),
   { Logger } = require('advanced-command-handler');

class client extends Client {
   constructor() {
      super({
         partials: ['MESSAGE', 'REACTION', 'CHANNEL'],
         intents: Object.keys(Intents.FLAGS),
         restTimeOffset: 0,
      });
      this.config = require('./../../config');
      this.functions = require('./../../utils/functions');
      this.login(this.config.token).catch((e) => { console.log(e) });

      this.commands = new Collection();
      this.aliases = new Collection();
      
      this.Logger = Logger;
      this.DataTypes = DataTypes;
      this.database = new Sequelize(this.config.database.name, this.config.database.user, this.config.database.password, {
         dialect: "mysql",
         define: {
            charset: "utf8mb4",
            collate: "utf8mb4_general_ci",
            timestamps: false,
            freezeTableName: true
         },
         dialectOptions: {
            connectTimeout: 60000
         },
         logging: false
      });
      this.initDatabase()

   }
   initDatabase() {
      Logger.log(`${Logger.setColor(`red`, `LOGIN`)}`, 'DATABASE')
      this.database.authenticate().then(async () => {
         new EventHandler(this); new CommandHandler(this);
         await this.database.sync({
            alter: true,
         })
         this.managers = new Managers(this)
      })
   };
}

exports.client = client;