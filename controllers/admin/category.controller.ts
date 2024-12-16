import Category from "../../models/category.model";
import { Request , Response } from "express";
import slugify from "slugify";

// GET /admin/categories
export const index = async (req:Request , res : Response) => {
    const categories = await Category.findAll({
        where: {
            deleted :false ,
            status : "active"
        },
        raw : true 
    })
    res.render("admin/pages/categories/index.pug" , {
        pageTitle : "Danh Mục Tour" ,
        categories : categories
    });
}

//Get /admin/categories/create
export const create = async (req:Request , res : Response) => {
    res.render("admin/pages/categories/create.pug" , {
        pageTitle :"Thêm mới danh mục" , 
    });
}

export const createPost = async (req:Request , res : Response) => {
    const countTour = await Category.count() ;
    if(req.body.position === "" ){
        req.body.position = countTour + 1 ;
    }else{
        req.body.position = parseInt(req.body.position);
    }

    const slug = slugify(`${req.body.title}-${Date.now()}`, {
        replacement: '-',
        lower: false,
        strict: false,
        locale: 'vi',
        trim: true
    });
    
    const CategoryData = {
        title : req.body.title ,
        image : req.body.image,
        description : req.body.description,
        status : req.body.status ,
        position : parseInt(req.body.position),
        slug : slug
    }
    console.log(CategoryData);
    
    try {
        await Category.create(CategoryData);
        res.redirect("/admin/"); 
    } catch (error) {
        console.error(error);
    }
}
//Post /admin/categories/create

//get/admin/categories/edit/:id

//patch/admin/categories/edit/:id

//patch/admin/categories/delete/:id