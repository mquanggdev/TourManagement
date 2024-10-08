import sequelize from "../../config/database";
import Tour from "../../models/tour.model";
import { Request , Response } from "express";
import { QueryTypes } from "sequelize";

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
