import express,{ Express } from "express";
import dotenv from "dotenv" ;
import clientRoutes from "./router/client/index.route";
dotenv.config();
const app : Express = express() ;
const port: number | string = process.env.PORT || 3000;

app.set('views' , `${__dirname}/views`);
app.set('view engine' , 'pug');
app.use(express.static(`${__dirname}/public`));

// Client route
clientRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });