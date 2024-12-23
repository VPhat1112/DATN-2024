'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      NewDetail.belongsTo(models.news,{
        foreignKey:"new_id",
        as:"News"
      });
    }
  }
  NewDetail.init({
    new_id:DataTypes.INTEGER,
    Address: DataTypes.STRING,
    typeJob: DataTypes.STRING,
    Salary: DataTypes.DECIMAL(10,2),
    Min_Salary:DataTypes.DECIMAL(10,2),
    Max_Salary:DataTypes.DECIMAL(10,2),
    experience: DataTypes.STRING,
    Education:DataTypes.STRING,
    Welfare: DataTypes.STRING,
    image_decscription:DataTypes.TEXT('long'),
    Gender_requirements:DataTypes.STRING,
    Age_requirements:DataTypes.STRING,
    job_description: DataTypes.STRING,
    job_requirements: DataTypes.STRING,
    another_information: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NewDetail',
  });
  return NewDetail;
};