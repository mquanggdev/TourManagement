import { Express } from "express";
import { tourRoutes } from "./tour.route";
import { categoryRoutes } from "./category.route";
import { cartRoute } from "./cart.route";
import { orderRoute } from "./order.route";
import { userRoute } from "./user.route";
import { infoUser } from "../../middlewares/client/users.middleware";
const clientRoutes = (app: Express): void => {
  app.use(infoUser) ;

  app.use(`/tours`, tourRoutes);
  app.use(`/categories`, categoryRoutes );
  app.use("/cart", cartRoute);
  app.use("/order", orderRoute);
  app.use("/users", userRoute);
};

export default clientRoutes;