'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class language extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  language.init({
    cv_id:DataTypes.INTEGER,
    language_name: DataTypes.STRING,
    language_year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'language',
  });
  return language;
};