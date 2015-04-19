"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      username: {
        type: DataTypes.STRING
      },
      sublease_term: {
        type: DataTypes.INTEGER
      },
      move_in_date: {
        type: DataTypes.DATE
      },
      location: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("users").done(done);
  }
};