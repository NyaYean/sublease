"use strict";
module.exports = function(sequelize, DataTypes) {
  var listings = sequelize.define("listings", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {

    underscored: true,

    classMethods: {
      associate: function(models) {
        listings.belongsToMany(models.users, {
          through: 'users_listings',
          foreignKey: 'listings_id'
        })
      }
    }
  });
  return listings;
};