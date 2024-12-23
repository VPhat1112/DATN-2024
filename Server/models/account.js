'use strict';
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      account.hasOne(models.seeker,{
        foreignKey:"account_id",
        targetKey:"account_id"
      });
      account.hasMany(models.notification,{
        foreignKey:"account_id",
      });
      account.hasOne(models.Company,{
        foreignKey:"account_id",
        targetKey:"account_id"
      });
      // define association here
    }
  }
  account.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    googleId: DataTypes.STRING,
    tokenUser: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    status: DataTypes.ENUM("activate","lock"),
    otp_expiration:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'account',
  });
  return account;
};