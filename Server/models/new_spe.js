'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class new_spe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      new_spe.belongsTo(models.news,{foreignKey:'newsId'});
      new_spe.belongsTo(models.specialized);
    }
  }
  new_spe.init({
    newsId: DataTypes.INTEGER,
    specializedId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'new_spe',
  });
  return new_spe;
};