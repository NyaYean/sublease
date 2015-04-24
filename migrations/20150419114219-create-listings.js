"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("listings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      url: {
        type: DataTypes.TEXT
      },
      pictures: {
        type: DataTypes.TEXT
      },
      date: {
        type: DataTypes.STRING
      },
      description: {
        type: DataTypes.STRING
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("listings").done(done);
  }
};