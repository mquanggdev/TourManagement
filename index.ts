import express,{ Express , Request , Response } from "express";
import sequelize from "./config/database";
import dotenv from "dotenv" ;
dotenv.config();
const app : Express = express() ;
const port: number | string = process.env.PORT || 3000;

app.set('views' , `${__dirname}/views`);
app.set('view engine' , 'pug');
sequelize;

app.get("/tours" , (req:Request , res : Response) => {
    res.render("client/pages/tours/index.pug");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });