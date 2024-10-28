'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      cv.belongsTo(models.seeker,{
        foreignKey:"seeker_id",
        as:"seeker"
      })
    }
  }
  cv.init({
    seeker_id: DataTypes.INTEGER,
    Type_cv: DataTypes.STRING,
    Career_goal: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'cv',
  });
  return cv;
};