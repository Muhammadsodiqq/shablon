export default class Models {
    static async UserModel (Sequelize,sequelize) {
        return sequelize.define("user", {
            user_id:{
                type:Sequelize.DataTypes.UUID,
                defaultValue:Sequelize.UUIDV4,
                primaryKey:true
            },
            user_lang:{
                type:Sequelize.DataTypes.STRING,
                allowNull: true,
            },
            step:{
                type:Sequelize.DataTypes.SMALLINT,
                defaultValue: 1,
            },
            chat_id:{
                type:Sequelize.DataTypes.INTEGER,
                allowNull:true,
                unique:true
            },
            user_name:{
                type:Sequelize.DataTypes.STRING,
                allowNull: true,

            },
            user_email: { 
                type: Sequelize.DataTypes.STRING,
                is: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                allowNull: false,
                unique: true,
            },
        })
    }

    static async attemptsModel(Sequelize,sequelize) {
        return sequelize.define("attempts",{
            id:{
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.DataTypes.UUIDV4()
            },
            code:{
                type: Sequelize.DataTypes.STRING(6),
                allowNull: false
            },
            attempts:{
                type: Sequelize.DataTypes.SMALLINT,
                allowNull: false,
                defaultValue: 0
            },
            isExpired: {
                type: Sequelize.DataTypes.BOOLEAN,
                defaultValue: false
            }
        })
    }
    
    static async CategoryModel(Sequelize,sequelize) {
        return sequelize.define("category", {
            category_id:{
                type:Sequelize.DataTypes.UUID,
                defaultValue:Sequelize.UUIDV4,
                primaryKey:true
            },
            category_name:{
                type:Sequelize.DataTypes.STRING,
                allowNull:false,
                unique:true
            }
        })
    }

    static async typeModel(Sequelize,sequelize) {
        return sequelize.define("category_type", {
            type_id:{
                type:Sequelize.DataTypes.UUID,
                defaultValue:Sequelize.UUIDV4,
                primaryKey:true
            },
            type_name:{
                type:Sequelize.DataTypes.STRING,
                allowNull:false
            }
        })
    }

    static async PhotoModel (Sequelize,sequelize) {
        return sequelize.define("photo", {
            photo_id: {
                type: Sequelize.DataTypes.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUIDV4
            },
            type: {
                type: Sequelize.DataTypes.ENUM,
                values: ["png","jpg","jpeg"],
                allowNull: false
            }
        })
    }

}