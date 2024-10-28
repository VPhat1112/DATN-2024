'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seeker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      seeker.belongsTo(models.account,{
        foreignKey:"account_id",
        as:"account"
      });
      seeker.hasMany(models.notification,{
        foreignKey:"seekers_id",
        targetKey:"seekers_id"
      });
      seeker.hasMany(models.history,{
        foreignKey:"seekers_id",
        targetKey:"seekers_id"
      })
      seeker.hasMany(models.cv,{
        foreignKey:"seeker_id",
        targetKey:"seeker_id"
      })
    }
  }
  seeker.init({
    account_id: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    genber: DataTypes.STRING,
    image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'seeker',
  });
  return seeker;
};