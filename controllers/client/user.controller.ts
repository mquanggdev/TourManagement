import { Request, Response } from "express";
import { generateRandomNumber, generateRandomString } from "../../helpers/generate.helper";
import Users from "../../models/users.model";
import { sendEmail } from "../../helpers/sendEmail.help";
import ForgotPassword from "../../models/forgot-password.model";
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

  // [GET] /users/logout
export const logout = async (req: Request, res: Response) => {
  res.clearCookie("tokenUser");
  res.redirect("/users/login");
};

// [GET] /users/password/forgotPassword
export const forgotPassword = async (req: Request, res: Response) => {
  res.render("client/pages/users/forgot-password.pug", {
    pageTitle : "Điền thông tin Email"
  })
};
// [Post] /users/password/forgotPasswordPost
export const forgotPasswordPost = async (req: Request, res: Response) => {
  // Lưu database
    const email = req.body.email ;
    const user = await Users.findOne({
      where : {
        email:email,
        deleted:false
      },
      raw : true
    });
  if (!user) {
    req.flash("error", "Email không tồn tại trong hệ thống!");
    res.redirect("back");
    return;
  }
  const otp = generateRandomNumber(6) ;
  const expireAt = Date.now() + 3*60*1000 ;
  const objectOtp = {
    email: email ,
    otp: otp,
    expireAt : expireAt 
  }
  // gửi otp tự động qua email
  const subject = "Mã OTP lấy lại mật khẩu.";
  const htmlSendMail = `Mã OTP xác thực của bạn là <b style="color: green;">${otp}</b>. Mã OTP có hiệu lực trong 3 phút. Vui lòng không cung cấp mã OTP cho người khác.`;
  sendEmail(email, subject, htmlSendMail);
  await ForgotPassword.create(objectOtp);
  res.redirect(`/users/password/otp?email=${email}`) ;
};
// [GET] /users/password/otp
export const otpPassword = async (req: Request, res: Response) => {
  const email = req.query.email;
  res.render("client/pages/users/otp-password.pug", {
    pageTitle : "Nhập OTP",
    email:email
  })
};
// [post] /users/password/otp
export const otpPasswordPost = async (req: Request, res: Response) => {
  const email = req.body.email ;
  const otp = req.body.otp ;

  const result = await ForgotPassword.findOne({
    where : {
      otp:otp,
    },
    raw : true
  });
  

  if(!result){
    req.flash("error", "OTP không hợp lệ!");
    res.redirect("back");
    return;
  }

  const user = await Users.findOne({
    where : {
      email:email,
    },
    raw : true
  });

  res.cookie("tokenUser", user["tokenUser"]);

  res.redirect("/users/password/reset")
};
// [GET] /users/password/reset
export const resetPassword = async (req: Request, res: Response) => {
  res.render("client/pages/users/reset.pug", {
    pageTitle : "Đổi Mật Khẩu"
  })
};
// [patch] /users/password/reset
export const resetPasswordPatch = async (req: Request, res: Response) => {
  const newPassword = req.body.passwordHash ;
  await Users.update(
    { 
      passwordHash : md5(newPassword)
    } , {
      where : {
        tokenUser: req.cookies.tokenUser
      }
    }
  )
  res.redirect("/tours/tour");
};

// [GET] /user/profile
export const profile = async (req: Request, res: Response) => {
  res.render("client/pages/users/profile", {
    pageTitle: "Thông tin cá nhân"
  });
}