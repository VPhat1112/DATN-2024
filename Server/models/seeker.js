'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class seeker extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      seeker.belongsTo(models.account,{
        foreignKey:"account_id",
        as:"account"
      });
      seeker.hasMany(models.history,{
        foreignKey:"seekers_id",
        targetKey:"seekers_id"
      })
      seeker.hasMany(models.cv,{
        foreignKey:"seeker_id",
        targetKey:"seeker_id"
      })
      seeker.hasMany(models.education,{
        foreignKey:"seeker_id",
      });

      seeker.hasMany(models.experience,{
        foreignKey:"seeker_id",
      })

      seeker.hasMany(models.language,{
        foreignKey:"seeker_id",
      });

      seeker.hasMany(models.project,{
        foreignKey:"seeker_id",
      });

      seeker.hasMany(models.skill,{
        foreignKey:"seeker_id",
      });
      seeker.hasOne(models.Information_Job,{
        foreignKey:"seeker_id",
      });
    }
  }
  seeker.init({
    account_id: DataTypes.INTEGER,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    genber: DataTypes.STRING,
    image: DataTypes.TEXT('long'),
    National: DataTypes.STRING,
    Nationality: DataTypes.STRING,
    Married: DataTypes.STRING,
    DateBirth: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'seeker',
  });
  return seeker;
};