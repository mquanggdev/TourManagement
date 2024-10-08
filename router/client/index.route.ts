import { Express } from "express";
import { tourRoutes } from "./tour.route";
import { categoryRoutes } from "./category.route";
import { cartRoute } from "./cart.route";
import { orderRoute } from "./order.route";
const clientRoutes = (app: Express): void => {

  app.use(`/tours`, tourRoutes);
  app.use(`/categories`, categoryRoutes );
  app.use("/cart", cartRoute);
  app.use("/order", orderRoute);
};

export default clientRoutes;