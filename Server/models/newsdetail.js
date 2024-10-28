'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class newsDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      newsDetail.belongsTo(models.news,{
        foreignKey:"newDetail_id",
        as:"news"
      })
    }
  }
  newsDetail.init({
    newDetail_id:DataTypes.INTEGER,
    Address: DataTypes.STRING,
    typeJob: DataTypes.STRING,
    Salary: DataTypes.INTEGER,
    experience: DataTypes.STRING,
    jobLevel: DataTypes.STRING,
    Welfare: DataTypes.STRING,
    job_description: DataTypes.STRING,
    job_requirements: DataTypes.STRING,
    another_information: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'newsDetail',
  });
  return newsDetail;
};