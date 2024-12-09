
import sequelize from "../../config/database";
import Category from "../../models/category.model";
import Tour from "../../models/tour.model";
import { Request , Response } from "express";
import { QueryTypes } from "sequelize";
import { generateTourCode } from "../../helpers/generate.helper";
import slugify from "slugify";
import TourCategory from "../../models/tour-category.model";
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
        images : JSON.stringify(req.body.images),
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


// GET /admin/detail/:id 
export const detail = async ( req : Request , res : Response ) => {
    const tourID = req.params.id;
    console.log(tourID);
    const tourCur = await Tour.findOne({
        where : {
            id : tourID,
            deleted : false ,
            status : "active"
        } ,
        raw : true
    }) ;

        if(tourCur["images"]){
            const images = JSON.parse(tourCur["images"]);
            tourCur["imagess"] = images ;
        }       
        tourCur["price_special"] = (1 - tourCur["discount"] / 100) * tourCur["price"] ;
        tourCur["price_special"] = parseInt(tourCur["price_special"]);
        console.log(tourCur);
        
    res.render("admin/pages/tours/detail.pug" , {
        pageTitle :"Chi tiết tour" ,
        tour : tourCur 
    });
}

// GET / admin/edit/:id

export const edit = async ( req : Request ,res : Response ) => {
    try{
    const tourID = req.params.id ;
    const tour = await Tour.findOne({
        where : {
            id : tourID , 
            deleted:false ,
            status: "active"
        },
        raw : true
    }) ;

    const categories = await Category.findAll({
        where : {
            deleted: false ,
            status : "active",
        },
        raw : true
    })
        
            const tourCategory = await TourCategory.findOne({
                where : {
                    tour_id : tourID
                },
                raw: true
            })
            console.log(tourCategory);

            const category = await Category.findOne({
                where : {
                    id : tourCategory["category_id"]
                },
                raw : true 
            })
            console.log(category);
                const infoDisplay = {
                    title : tour["title"],
                    categoryCur: category["title"],
                    images : tour["images"] ,
                    price : tour["price"] ,
                    discount : tour["discount"] ,
                    stock : tour["stock"] ,
                    timeStart : tour["timeStart"],
                    position : tour["position"], 
                    status : tour["status"]
                }
            res.render("admin/pages/tours/detail.pug" , {
                pageTitle :"Chi tiết tour" , 
            });
    } catch (error) {
        console.log("Lỗi khi truy cập vào tourCategory");
    }
}

//post/admin/edit/:id

// patch/admin/delete/:id