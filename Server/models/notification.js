'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      notification.belongsTo(models.seeker,{
        foreignKey:"seekers_id",
        as:"seeker"
      })
    }
  }
  notification.init({
    seekers_id: DataTypes.INTEGER,
    notification_content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'notification',
  });
  return notification;
};