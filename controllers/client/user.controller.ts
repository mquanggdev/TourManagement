import { Request, Response } from "express";
import { generateRandomString } from "../../helpers/generate.helper";
import Users from "../../models/users.model";
var md5 = require('md5');


// GET : /users/register

export const register = async (req: Request , res : Response) => {
    res.render("client/pages/users/register.pug" , {
        pageTile : "Trang Đăng Ký"
    }) ;
}

export const registerPost = async (req: Request , res : Response) => {

    const userInFo = {
        username : req.body.username ,
        email : req.body.email ,
        passwordHash : md5(req.body.passwordHash),
        phone : "" ,
        tokenUser : generateRandomString(15) ,
        avatar : "" ,
        status : "active",
    }

    const newUser = await Users.create(userInFo);
    
    res.cookie("tokenUser" ,newUser["tokenUser"] ) ;
    
    res.json({
        code : 200 ,
        newUser : newUser
    }) ;
}

// [GET] /user/login
export const login = async (req: Request , res : Response) => {
    res.render("client/pages/users/login.pug", {
      pageTitle: "Đăng nhập tài khoản",
    });
  };
//POST/user/loginPost
export const loginPost = async (req: Request, res: Response) => {
    try {
      const user = await Users.findOne({
        where: { email: req.body.email },
        raw: true,
      });
  
      if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.json({ code: 401, message: "Email không tồn tại!" });
      }
  
      if (user["status"] === "inactive") {
        req.flash("error", "Tài khoản đang bị khóa!");
         res.json({ code: 401, message: "Tài khoản đang bị khóa!" });
      }
  
      if (md5(req.body.passwordHash) !== user["passwordHash"]) {
        req.flash("error", "Sai mật khẩu!");
        res.json({ code: 401, message: "Sai mật khẩu!" });
      }
  
      res.cookie("tokenUser", user["tokenUser"], {
        httpOnly: true,
        secure: false, 
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, 
      });

      req.flash("success", "Đăng nhập thành công!");
      res.json({ code: 200, message: "Đăng nhập thành công!" });

    } catch (error) {
      console.error("Error during login:", error);
       res.status(500).json({ code: 500, message: "Lỗi hệ thống!" });
    }
  };