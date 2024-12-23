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
      language.belongsTo(models.seeker,{
        foreignKey:"seeker_id",
      })
    }
  }
  language.init({
    seeker_id:DataTypes.INTEGER,
    language_name: DataTypes.STRING,
    proficiency : DataTypes.STRING,
    certificate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'language',
  });
  return language;
};