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
      location: {
        type: DataTypes.STRING
      },
      price: {
        type: DataTypes.INTEGER
      },
      sublease_term: {
        type: DataTypes.INTEGER
      },
      start_date: {
        type: DataTypes.TEXT
      },
      bedrooms: {
        type: DataTypes.INTEGER
      },
      bathrooms: {
        type: DataTypes.INTEGER
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
    migration.dropTable("listings").done(done);
  }
};