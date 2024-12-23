'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApplyCv extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ApplyCv.belongsTo(models.cv,{
        foreignKey:"cv_id",
        as:"CvApply"
      })

      ApplyCv.belongsTo(models.news,{
        foreignKey:"cv_id",
        as:"newApply"
      })
    }
  }
  ApplyCv.init({
    new_id: DataTypes.INTEGER,
    cv_id: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ApplyCv',
  });
  return ApplyCv;
};