
import sequelize from "../../config/database";
import { Request , Response } from "express";
import { generateTourCode } from "../../helpers/generate.helper";
import slugify from "slugify";
import { systemConfig } from "../../config/system";
import Users from "../../models/users.model";

// get admin/index
export const index = async (req: Request, res: Response) => { 
    // SELECT * FROM tours WHERE deleted = false;
    const users = await Users.findAll({
      where: {
        deleted: false,
      },
      raw: true
    });
  
    users.forEach(item => {
      if(item["images"]) {
        const images = JSON.parse(item["images"]);
        item["image"] = images[0];
      }
      item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
    });

  
    res.render("admin/pages/users/index", {
      pageTitle: "Danh sách người dùng",
      users: users
    });
  };


