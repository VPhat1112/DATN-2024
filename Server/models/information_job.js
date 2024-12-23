'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Information_Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Information_Job.belongsTo(models.seeker,{
        foreignKey:"seeker_id",
      })
    }
  }
  Information_Job.init({
    seeker_id: DataTypes.STRING,
    Desired_level: DataTypes.STRING,
    Salary: DataTypes.STRING,
    type_Work: DataTypes.STRING,
    work_methods: DataTypes.STRING,
    Industry: DataTypes.STRING,
    Workplace: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Information_Job',
  });
  return Information_Job;
};