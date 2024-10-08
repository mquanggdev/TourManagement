import { Express } from "express";
import { categoryRoute } from "./category.route";
import { tourRoute } from "./tour.route";
import { systemConfig } from "../../config/system";
// import { categoryRoutes } from "./category.route";
// import { cartRoute } from "./cart.route";
// import { orderRoute } from "./order.route";
const adminRoutes = (app: Express): void => {
    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/categories` , categoryRoute);
    app.use(`${PATH_ADMIN}/tours` , tourRoute);
};

export default adminRoutes;