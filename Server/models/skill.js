'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class skill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      skill.belongsTo(models.seeker,{
        foreignKey:"seeker_id",
      })
    }
  }
  skill.init({
    seeker_id:DataTypes.INTEGER,
    Skill_name: DataTypes.STRING,
    description: DataTypes.STRING,
    certificate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'skill',
  });
  return skill;
};