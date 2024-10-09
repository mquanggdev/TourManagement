
import sequelize from "../../config/database";
import Category from "../../models/category.model";
import Tour from "../../models/tour.model";
import { Request , Response } from "express";
import { QueryTypes } from "sequelize";
import { generateTourCode } from "../../helpers/generate.helper";
import slugify from "slugify";
import TourCategory from "../../models/tour-category.mode";
import { systemConfig } from "../../config/system";

// GET /admin/tours/
export const index = async (req:Request , res : Response) => {
    const tours = await Tour.findAll({
        where : {
            deleted:false
        },
        raw : true
    })
    tours.forEach(item => {
        if(item["images"]){
            const images = JSON.parse(item["images"]);
            item["image"] = images[0];
        }
        item["price_special"] = (1 - item["discount"] / 100) * item["price"] ;
        item["price_special"] = parseInt(item["price_special"]);
    }) ;
    
    
    res.render("admin/pages/tours/index.pug" , {
        pageTitle :"Danh sách tour",
        tours : tours
    });
}


// GET admin/tours/create
export const create = async (req:Request , res : Response) => {
    const categories = await Category.findAll({
        where : {
            deleted: false ,
            status : "active",
        },
        raw : true
    })
    res.render("admin/pages/tours/create.pug" , {
        pageTitle :"Thêm mới tour" , 
        categories : categories
    });
}

//  Post admin/tours/create
export const createPost = async (req:Request , res : Response) => {
    const countTour = await Tour.count() ;
    const code = generateTourCode(countTour + 1)
    if(req.body.position === "" ){
        req.body.position = countTour + 1 ;
    }else{
        req.body.position = parseInt(req.body.position);
    }
    console.log(req.body);
    
    const dataTour = {
        title : req.body.title, 
        code :code ,
        price : parseInt(req.body.price),
        discount : parseInt(req.body.discount),
        stock : parseInt(req.body.stock),
        timeStart : req.body.timeStart,
        position : req.body.position,
        status : req.body.status
    }
     const tour = await  Tour.create(dataTour) ;
    const tourId = tour["id"] ;
    const dataTourCategory = {
        tour_id : tourId,
        category_id : parseInt(req.body.category_id)
    };

    await TourCategory.create(dataTourCategory);
    
    res.redirect(`/${systemConfig.prefixAdmin}/tours`) ;
}