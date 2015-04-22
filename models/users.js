"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    }, 
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {msg: 'The username has already been taken.'}
    },
    sublease_term: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    }, 
    password_digest: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {

    underscored: true,

    classMethods: {
      associate: function(models) {
        users.belongsToMany(models.listings, {
          through: 'users_listings',
          foreignKey: 'users_id'
        });
      }
    }
  });
  return users;
};