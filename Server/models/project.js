'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      project.belongsTo(models.seeker,{
        foreignKey:"seeker_id",
      })
    }
  }
  project.init({
    seeker_id:DataTypes.INTEGER,
    Project_name: DataTypes.STRING,
    description:DataTypes.STRING,
    Project_git: DataTypes.STRING,
    start_date:DataTypes.DATE,
    end_date:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'project',
  });
  return project;
};