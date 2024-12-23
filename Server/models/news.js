'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class news extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      news.belongsTo(models.Company,{
        foreignKey:"Company_id",
        as:"Company"
      });

      news.hasMany(models.ApplyCv,{
        foreignKey:"cv_id",
        as:"ApplyNews"
      });

      news.hasMany(models.new_spe,{foreignKey:'newsId',as:'spe'})

      news.hasOne(models.NewDetail,{
        foreignKey:"new_id",
        targetKey:"new_id"
      });
    }
  }
  news.init({
    Company_id: DataTypes.INTEGER,
    Job_name: DataTypes.STRING,
    numberCV: DataTypes.INTEGER,
    date_expiration: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'news',
  });
  return news;
};