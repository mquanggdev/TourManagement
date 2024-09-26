import express,{ Express , Request , Response } from "express";
const app : Express = express() ;
const port:Number = 3000;

app.set('views' , `${__dirname}/views`);
app.set('view engine' , 'pug');

app.get("/tours" , (req:Request , res : Response) => {
    res.send("Danh sach tour");
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });