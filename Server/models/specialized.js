'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class specialized extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  specialized.init({
    Specialized_name: DataTypes.STRING,
    Specialized_description: DataTypes.STRING,
    Specialized_image: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'specialized',
  });
  return specialized;
};