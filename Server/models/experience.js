'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class experience extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      experience.belongsTo(models.seeker,{
        foreignKey:"seeker_id",
      })
    }
  }
  experience.init({
    seeker_id:DataTypes.INTEGER,
    job_title: DataTypes.STRING,
    company: DataTypes.STRING,
    start_date :DataTypes.DATE,
    end_date:DataTypes.DATE,
    description:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'experience',
  });
  return experience;
};