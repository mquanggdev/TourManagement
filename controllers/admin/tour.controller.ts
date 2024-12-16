
import sequelize from "../../config/database";
import Category from "../../models/category.model";
import Tour from "../../models/tour.model";
import { Request , Response } from "express";
import { generateTourCode } from "../../helpers/generate.helper";
import slugify from "slugify";
import TourCategory from "../../models/tour-category.model";
import { systemConfig } from "../../config/system";

// get admin/index
export const index = async (req: Request, res: Response) => { 
    // SELECT * FROM tours WHERE deleted = false;
    const tours = await Tour.findAll({
      where: {
        deleted: false,
      },
      raw: true
    });
  
    tours.forEach(item => {
      if(item["images"]) {
        const images = JSON.parse(item["images"]);
        item["image"] = images[0];
      }
      item["price_special"] = (item["price"] * (1 - item["discount"] / 100));
    });

  
    res.render("admin/pages/tours/index", {
      pageTitle: "Danh sách tour",
      tours: tours
    });
  };


// [GET] /admin/tours/create
export const create = async (req: Request, res: Response) => {
    // SELECT * FROM categories WHERE deleted = false AND status = "active";
    const categories = await Category.findAll({
      where: {
        deleted: false,
        status: 'active',
      },
      raw: true
    });

  
    res.render("admin/pages/tours/create", {
      pageTitle: "Thêm mới tour",
      categories: categories
    });
  };

//  Post admin/tours/create
export const createPost = async (req:Request , res : Response) => {
    if(req.body.position) {
        req.body.position = parseInt(req.body.position);
      } else {
        const countTour = await Tour.count();
        req.body.position = countTour + 1;
      }
    
      const slug = slugify(`${req.body.title}-${Date.now()}`, {
        lower: true
      });
    
      const dataTour = {
        title: req.body.title,
        code: "",
        price: parseInt(req.body.price),
        discount: parseInt(req.body.discount),
        stock: parseInt(req.body.stock),
        timeStart: req.body.timeStart,
        position: req.body.position,
        status: req.body.status,
        slug: slug,
        images: JSON.stringify(req.body.images),
        information: req.body.information,
        schedule: req.body.schedule,
      };
    
      const tour = await Tour.create(dataTour);
      const tourId = tour.dataValues.id;
      const code = generateTourCode(tourId);
    
      await Tour.update({
        code: code
      }, {
        where: {
          id: tourId
        }
      });
    
      const dataTourCategory = {
        tour_id: tourId,
        category_id: parseInt(req.body.category_id)
      }
    
      await TourCategory.create(dataTourCategory);
    
      res.redirect(`/${systemConfig.prefixAdmin}/tours`);
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

// [GET] /admin/tours/edit/:id
export const edit = async (req: Request, res: Response) => {
  const id = req.params.id;

  const tour = await Tour.findByPk(id, { raw: true });

  const tourCategory = await TourCategory.findOne({
    where : {
      tour_id : tour["id"]
    }
  })
  
  
  const categories = await Category.findAll({
    where: { deleted: false, status: "active" },
    raw: true,
  });

  tour["images"] = JSON.parse(tour["images"] || "[]");

  res.render("admin/pages/tours/edit", {
    pageTitle: "Chỉnh sửa tour",
    tour: tour,
    tourCategory : tourCategory,
    categories: categories,
  });
};

// [Patch] /admin/tours/edit/:id
export const editPatch = async (req: Request, res: Response) => {
  const id = req.params.id;

  const updatedTourData = {
    title: req.body.title,
    price: parseInt(req.body.price),
    discount: parseInt(req.body.discount),
    stock: parseInt(req.body.stock),
    timeStart: req.body.timeStart,
    position: parseInt(req.body.position),
    status: req.body.status,
    images: JSON.stringify(req.body.images),
    information: req.body.information,
    schedule: req.body.schedule,
  };

  try {
    await Tour.update(updatedTourData, { where: { id: id } });

    // Cập nhật danh mục
    if (req.body.category_id) {
      await TourCategory.update(
        { category_id: parseInt(req.body.category_id) },
        { where: { tour_id: id } }
      );
    }

    res.redirect(`/${systemConfig.prefixAdmin}/tours`);
  } catch (error) {
    console.error("Error updating tour:", error);
  }
};

// patch/admin/delete/:id


export const deleteTour = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const tour = await Tour.findByPk(id);

    await Tour.update({ deleted: true }, { where: { id } });

    res.json({
      code: 200
    })
  } catch (error) {
    console.error("Error deleting tour:", error);
  }
};