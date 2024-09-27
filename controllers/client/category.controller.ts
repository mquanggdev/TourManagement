import Tour from "../../models/tour.model";
import { Request , Response } from "express";

export const index = async (req:Request , res : Response) => {
    res.render("client/pages/categories/index.pug" , {
        pageTitle : "Trang Danh Mục"
    });
}