import { Sequelize } from "sequelize";
import dotenv from "dotenv" ;
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST, // link hosting
    dialect: 'mysql'
  }
);
sequelize.authenticate().then(() => {
  console.log('Kết Nối Thành Công');
}).catch((error) => {
  console.error('Đã Xảy ra Lỗi: ', error);
});

export default sequelize ;