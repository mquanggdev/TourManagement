import express,{ Express } from "express";
import dotenv from "dotenv" ;
import clientRoutes from "./router/client/index.route";
import adminRoutes from "./router/admin/index.route";

import bodyParser from "body-parser";
import { systemConfig } from "./config/system";

import session from "express-session";
import flash from "express-flash";

import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
 
dotenv.config();
const app : Express = express() ;
const port: number | string = process.env.PORT || 3000;

app.set('views' , `${__dirname}/views`);
app.set('view engine' , 'pug');
app.use(express.static(`${__dirname}/public`));

// Flash
app.use(cookieParser('Yalidas'));
// Cấu hình session
app.use(
  session({
    secret: "Yalidas",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);
app.use(flash());
app.use(cookieParser());
app.use(methodOverride('_method'))
// End Flash

// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // đọc trực tiếp từ form
app.locals.prefixAdmin = systemConfig.prefixAdmin ;

// Client route
clientRoutes(app);
adminRoutes(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });