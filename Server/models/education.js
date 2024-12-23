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
      education.belongsTo(models.seeker,{
        foreignKey:"seeker_id",
      })
    }
  }
  education.init({
    seeker_id:DataTypes.INTEGER,
    degree: DataTypes.STRING,
    major: DataTypes.INTEGER,
    university: DataTypes.INTEGER,
    graduation_date:DataTypes.DATE
  }, {
    sequelize,
    modelName: 'education',
  });
  return education;
};