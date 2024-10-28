'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class education extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  education.init({
    cv_id:DataTypes.INTEGER,
    Education_name: DataTypes.STRING,
    Education_yearFirst: DataTypes.INTEGER,
    Education_yearLast: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'education',
  });
  return education;
};