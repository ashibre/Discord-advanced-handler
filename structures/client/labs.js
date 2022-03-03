const { Collection, Client } = require('discord.js'),
   { CommandHandler, EventHandler } = require('../Handler'),
   { Sequelize, DataTypes } = require('sequelize'),
   { Managers } = require('../Managers'),
   config = require('../../config'),
   { Logger } = require('advanced-command-handler'),
   user = config.database.user,
   name = config.database.name,
   pass = config.database.password,
   token = config.token;

class labs extends Client {
   constructor(options) {
      super(options);

      this.functions = require('../../utils/functions');
      this.commands = new Collection();
      this.events = new Collection();
      this.aliases = new Collection();

      this.config = config;
      this.setMaxListeners(40);
      
      this.Logger = Logger;
      this.DataTypes = DataTypes;
      this.database = new Sequelize(name, user, pass, {
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

      void this.start();

   }

   start() {
      void this.initDatabase()
      void this.login(token).catch((e) => { console.log(e) });
   }

   initDatabase() {
      Logger.log(`${Logger.setColor(`red`, `LOGIN`)}`, 'DATABASE')
      this.database.authenticate().then(async () => {
         new EventHandler(this);
         new CommandHandler(this);
         await this.database.sync({
            alter: true,
            force: false
         })
         this.managers = new Managers(this)
      })
   };

}

exports.labs = labs;
