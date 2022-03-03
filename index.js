const moment = require('moment')
const { Intents } = require('discord.js')
const { labs } = require("./structures/client/labs");
new labs({
   partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
   restTimeOffset: 0,
   intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES]
});
moment.locale('fr')