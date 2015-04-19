"use strict";
module.exports = function(sequelize, DataTypes) {
  var listings = sequelize.define("listings", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {msg: 'Please enter a price'}
      }
    },
    sublease_term: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {msg: 'Please enter sublease term in numbers'}
      }
    },
    start_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {msg: 'Not a valid date'}
      }
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDate: {msg: 'Please enter numbers only'}
      }
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isDate: {msg: 'Please enter numbers only'}
      }
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