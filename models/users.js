"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {msg: 'Only include letters in your name'}
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
    move_in_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {msg: 'Please enter a valid date'}
      }
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['NY']],
          msg: "Only in NY...more places to come soon."
        }
      }
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