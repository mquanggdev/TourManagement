import { DataTypes } from "sequelize";
import sequelize from "../config/database";
const Users = sequelize.define("Users", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username : {
    type: DataTypes.STRING (50) ,
    allowNull : false
  },
  email : {
    type: DataTypes.STRING (50) ,
    allowNull : false
  } ,
  passwordHash : {
    type : DataTypes.STRING(255) ,
    allowNull : false
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  tokenUser : {
    type : DataTypes.TEXT ,
    allowNull : false
  },
  avatar : {
    type : DataTypes.STRING(255)
  },
  status: {
    type: DataTypes.TINYINT,
  },
  deleted: {
    type: DataTypes.TINYINT,
    defaultValue: 0, // Đặt giá trị mặc định là false
  },
}, {
  tableName: 'users',
  timestamps: true, // Tự động quản lý createdAt và updatedAt
});
export default Users;