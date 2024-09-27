import sequelize from "../../config/database";
import Tour from "../../models/tour.model";
import { Request , Response } from "express";
import { QueryTypes } from "sequelize";

// GET /tours/:slugCategory
export const index = async (req:Request , res : Response) => {
    const slugCategory = req.params.slugCategory ;

    const tours = await sequelize.query(`
        SELECT tours.*,ROUND(price * (1 - discount/100)) AS price_special
        FROM tours
        JOIN tours_categories ON tours.id = tours_categories.tour_id
        JOIN categories ON tours_categories.category_id = categories.id
        WHERE 
            categories.slug = '${slugCategory}'
            AND categories.deleted = false
            AND categories.status = 'active'
            AND tours.deleted = false
            AND tours.status = 'active' ;
    `,{
        type : QueryTypes.SELECT // Phải định nghĩa kiểu query để không bị lồng mảng vào
    });
    

    tours.forEach(item => {
        if(item["images"]){
            const images = JSON.parse(item["images"]);
            item["image"] = images[0];
        }
    }) ;
    
    
    res.render("client/pages/tours/index.pug" , {
        tours : tours
    });
}