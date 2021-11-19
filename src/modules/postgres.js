import {Sequelize} from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DB_STRING, {
  logging: false,
  define: {
    freezeTableName: true,
  },
});


async function data() {
    try {
      let db = {};
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

export default data;
