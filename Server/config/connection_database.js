const { Sequelize } = require("sequelize");
//ket noi database
const sequelize = new Sequelize("datn_2024", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
    port: 3306
  });
  //kiểm tra xem có kết nối dc hay ko
  const connectionDatabase = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };
  connectionDatabase();
  // module.exports = connectionDatabase