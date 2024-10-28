'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsTo(models.account,{
        foreignKey:"account_id",
        as: "company"
      })
      Company.hasMany(models.news,{
        foreignKey:"Company_id",
        targetKey:"Company_id"
      })
    }
  }
  Company.init({
    account_id:DataTypes.INTEGER,
    nameCompany: DataTypes.STRING,
    typeCompany: DataTypes.STRING,
    numberEmployees: DataTypes.STRING,
    National: DataTypes.STRING,
    Address: DataTypes.STRING,
    Company_description: DataTypes.STRING,
    contactPerson: DataTypes.STRING,
    phoneContact: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};