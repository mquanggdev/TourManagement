import Category from "../../models/category.model";
import { Request , Response } from "express";


// GET /admin/categories
export const index = async (req:Request , res : Response) => {
    const categories = await Category.findAll({
        where: {
            deleted :false ,
            status : "active"
        },
        raw : true 
    })
    console.log(categories);
    res.render("admin/pages/categories/index.pug" , {
        pageTitle : "Danh Mục Tour" ,
        categories : categories
    });
}