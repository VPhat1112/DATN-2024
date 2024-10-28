'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      history.belongsTo(models.seeker,{
        foreignKey:"seekers_id",
        as:"seeker"
      })
    }
  }
  history.init({
    news_id: DataTypes.INTEGER,
    seekers_id: DataTypes.INTEGER,
    cv_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};