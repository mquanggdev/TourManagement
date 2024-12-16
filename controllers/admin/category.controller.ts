
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
//Post /admin/categories/create
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
        res.redirect("/admin/categories"); 
    } catch (error) {
        console.error(error);
    }
}


//get/admin/categories/edit/:id
export const edit = async (req:Request , res : Response) => {
    try {
        const id = req.params.id ;
        const category = await Category.findOne(
            {
                where : {
                    id : id , 
                    deleted : false 
                } ,
                raw : true
            }
        )
        res.render("admin/pages/categories/edit.pug" , {
            pageTitle :"Sửa danh mục" , 
            category : category
        });
    } catch (error) {
        console.log(error);
        
    }
   
}

//patch/admin/categories/edit/:id
export const editPatch = async (req:Request , res : Response) => {
    
    try {
        const id = req.params.id ;
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
        console.log(id);
        console.log(CategoryData);
        
        const [updatedRows] = await Category.update(CategoryData, {
            where: {
                id: id
            }
        });

        if (updatedRows === 0) {
            console.log("Không tìm thấy bản ghi để cập nhật.");
        } else {
            console.log("Cập nhật thành công.");
        }
        res.redirect("/admin/categories");
    } catch (error) {
        console.log(error);
    }
    
}
//patch/admin/categories/delete/:id
export const deleteCategory = async (req:Request , res : Response) => {
    try {
        const id = req.params.id;
        const [updatedRows] = await Category.update({ deleted: true }, {
            where: {
                id: id
            }
        });

        if (updatedRows === 0) {
            res.status(404).json({ code: 404, message: "Không tìm thấy danh mục" });
        }

        res.json({ code: 200, message: "Danh mục đã được xóa" });
    } catch (error) {
        console.log(error);
        
    }
   
}

// Get / detail /categories/detail/:id

export const detail = async (req:Request , res : Response) => {
    try {
        const id = req.params.id;
        const category = await Category.findOne(
            {
                where : {
                    id : id , 
                    deleted : false 
                } ,
                raw : true
            }
        )
        res.render("admin/pages/categories/detail.pug" ,{
            pageTitle : "Trang chi tiết sản phẩm",
            category : category
        })
    } catch (error) {
        console.log(error);
        
    }
   
}