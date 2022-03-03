module.exports = (database, DataTypes, modelName, config) => {
   try {
      database.define(modelName, {
         guildId: {
            type: DataTypes.STRING(25),
            allowNull: false,
            primaryKey: true,
         },
         prefix: {
            type: DataTypes.STRING(2),
            allowNull: false,
            defaultValue: config.prefix
         }
      }, {
         tableName: modelName,
         charset: 'utf8mb4',
         collate: 'utf8mb4_general_ci'
      })
      database.models[modelName].sync()
      return database.models[modelName]
   } catch (e) {
      console.log(e)
   }

}