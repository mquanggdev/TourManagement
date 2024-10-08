import express,{ Express } from "express";
import dotenv from "dotenv" ;
import clientRoutes from "./router/client/index.route";
import adminRoutes from "./router/admin/index.route";

import bodyParser from "body-parser";
import { systemConfig } from "./config/system";

dotenv.config();
const app : Express = express() ;
const port: number | string = process.env.PORT || 3000;

app.set('views' , `${__dirname}/views`);
app.set('view engine' , 'pug');
app.use(express.static(`${__dirname}/public`));
// parse application/json
app.use(bodyParser.json());
app.locals.prefixAdmin = systemConfig.prefixAdmin ;

// Client route
clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });