import {Sequelize} from "sequelize";
import dotenv from "dotenv";
import Models from "./Models.js"
dotenv.config();

const sequelize = new Sequelize(process.env.DB_STRING, {
  // logging: false,
  
});


async function data() {
  try {
    let db = {};
    
    db.users = await Models.UserModel(Sequelize,sequelize);
    db.category = await Models.CategoryModel(Sequelize,sequelize)
    db.type = await Models.typeModel(Sequelize,sequelize)
    db.photo = await Models.PhotoModel(Sequelize,sequelize)
    db.attempts = await Models.attemptsModel(Sequelize,sequelize)

    await db.users.hasMany(db.attempts,{
      foreignKey:{
        name:"user_id",
        allowNull:false
      }
    })
    
    await db.attempts.belongsTo(db.users,{
      foreignKey:{
        name:"user_id",
        allowNull:false
      }
    })
    
    await db.category.hasMany(db.type,{
      foreignKey:{
        name:"category_id",
        allowNull:false
      }
    })
    
    await db.type.belongsTo(db.category,{
      foreignKey:{
        name:"category_id",
        allowNull:false
      }
    })
    
    await db.type.hasMany(db.photo,{
      foreignKey:{
        name:"type_id",
        allowNull:false
      }
    })
    
    
    
    await db.photo.belongsTo(db.type,{
      foreignKey:{
        name:"type_id",
        allowNull:false
      }
    })
    await sequelize.sync({force:true})
    return db;
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default data;
