import Category from "../../models/category.model";
import { Request , Response } from "express";

export const index = async (req:Request , res : Response) => {
    const categories = await Category.findAll({
        where: {
            deleted :false ,
            status : "active"
        },
        raw : true 
    })
    console.log(categories);
    res.render("client/pages/categories/index.pug" , {
        pageTitle : "Trang Danh Mục" ,
        categories : categories
    });
}