import Validations from "../utils/validations.js"
import  Sequelize  from "sequelize";
import path from "path";
import fs from "fs/promises"
const {Op} = Sequelize

let __dirname = path.resolve(path.dirname(''));

export default class categoryController {
    static async addCategory(req,res) {
        try {
            let data = await Validations.categoryValidation().validateAsync(req.body);

            let userIsExists = await req.db.category.findOne({
                where:{
                    category_name: {
                        [Op.like]:  `%${data.category_name}%`
                    }
                }
            })

            if (userIsExists) throw ("category already exists");

            const category = await req.db.category.create({
                category_name: data.category_name,
            })

            res.status(200).json({
                ok: true,
                data: category,
            })
        } catch (error) {
             res.status(400).json({
                ok:false,
                message:error + ""
            }) 
        }
    }

    static async getCategory(req,res) {
        try {
            let data = await Validations.getValidation().validateAsync(req.body);
            
            let category = await req.db.category.findOne({
                where:{
                    category_id: data.id
                }
            })

            res.status(200).json({
                ok: true,
                data: category,
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error + ""
            }) 
        }
    }

    static async getCategories(req,res) {
        try {
            let category = await req.db.category.findAll()

            res.status(200).json({
                ok: true,
                data: category,
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error + ""
            })  
        }
    }

    static async updateCategory(req,res) {
        try {
            let data = await Validations.updateValidation().validateAsync(req.body);
            
            let category = await req.db.category.findOne({
                where:{
                    category_id: data.id
                }
            })
            console.log(category);
            if(!category) throw "this category is not exists";

            let category1 = await req.db.category.update({
                category_name:data.name
            }, {
                where:{
                    category_id: data.id
                }
            })

            res.status(200).json({
                ok: true,
                data: category1,
            })
        } catch (error) {
            console.log(error);
            res.status(400).json({
                ok:false,
                message:error + ""
            }) 
        }
    }

    static async deleteCategory(req,res) {
        try {
            let data = await Validations.getValidation().validateAsync(req.body);
            
            let category = await req.db.category.destroy({
                where:{
                    category_id: data.id
                }
            })

            res.status(200).json({
                ok: true,
                data: category,
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error + ""
            }) 
        }
    }

    static async addType(req,res) {
        try {
            let data = await Validations.updateValidation().validateAsync(req.body);
            
            let category = await req.db.category.findOne({
                where:{
                    category_id: data.id
                }
            })

            if(!category) throw "this category is not exists";

            const type = await req.db.type.create({
                category_id: data.id,
                type_name:data.name
            })

            res.status(200).json({
                ok: true,
                data: type,
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error + ""
            }) 
        }
    }

    static async getTypesByCategory(req,res) {
        try {
            let data = await Validations.getValidation().validateAsync(req.body);
            
            let category = await req.db.category.findOne({
                where:{
                    category_id: data.id
                }
            })

            if(!category) throw "this category is not exists";

            let type = await req.db.type.findAll({
                where:{
                    category_id:data.id
                }
            })

            res.status(200).json({
                ok: true,
                data: type,
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error + ""
            }) 
        }
    }

    static async add_photo(req,res) {
        let fileBase
        let type
        try {
            const type_id = req.headers['type_id'];
            if(!type_id) throw "id is invalid";

            let type = await req.db.type.findOne({
                where:{
                    type_id: type_id
                }
            })

            if(!type) throw "this type is not exists"

            const fileElement = req.files.file;
            if(!fileElement) throw new Error("File not found");
            if((fileElement.size / 1024) > (50 * 1024)) throw new Error("File size is over size")
            type = fileElement.name.split(".")[fileElement.name.split(".").length - 1]
            if (!(type == "png" || type == "jpg" || type == "jpeg")) throw "this is not picture";


            const photo = await req.db.photo.create({
                type: type,
                type_id: type_id
            })

            fileBase = photo;

            const filePath = path.join(__dirname,"src","public","files",`${photo.dataValues.photo_id}.`+ type);
            let fafa = await fs.writeFile(filePath,fileElement.data)

            await res.status(201).json({
                ok: true,
                message: "File uploaded",
                photo
            })
        } catch (error) {
            console.log(error);
            if(fileBase) {
                console.log(fileBase);
                const filePath = path.join(__dirname,"src","server","public","files",`${fileBase.dataValues.photo_id}.`+ fileBase.dataValues.type);
                await fs.unlink(filePath)
                await req.db.photo.destroy({
                    where: {
                        photo_id: fileBase.dataValues.photo_id
                    }
                })
            }
            
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }

    static async getPhotosByType(req,res) {
        try {
            let data = await Validations.getValidation().validateAsync(req.body);
            
            let category = await req.db.type.findOne({
                where:{
                    type_id: data.id
                }
            })

            if(!category) throw "this type is not exists";

            let photo = await req.db.photo.findAll({
                where:{
                    type_id:data.id
                }
            })

            res.status(200).json({
                ok: true,
                data: photo,
            })
        } catch (error) {
            res.status(400).json({
                ok:false,
                message:error + ""
            }) 
        }
    }
}