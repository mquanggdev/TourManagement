import { Request, Response, NextFunction } from "express";
import Users from "../../models/users.model"; // Đảm bảo import đúng model

export const infoUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await Users.findOne({
      where: {
        tokenUser: req.cookies.tokenUser,
        deleted: false,
      },
      raw: true,
    });

    if (user) {
      res.locals.user = user; 
    } else {
      res.locals.user = null;
    }

    next(); 
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports.requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if(!req.cookies.tokenUser){
    res.redirect("/user/login");
    return;
  }

    try {
      const user = await Users.findOne({
        where: {
          tokenUser: req.cookies.tokenUser,
          deleted: false,
        },
        raw: true,
      });

    if(!user) {
      res.redirect("/users/login");
      return;
    }

    next();
    }catch(error){
      res.status(500).json({ error: "Internal Server Error" });
    }
}
