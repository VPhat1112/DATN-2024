'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class numberspecia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  numberspecia.init({
    Specialized_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'numberspecia',
  });
  return numberspecia;
};