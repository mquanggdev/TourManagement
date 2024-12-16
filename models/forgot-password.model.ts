import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const ForgotPassword = sequelize.define("ForgotPassword", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  expireAt: {
    type: DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'forgot_password',
  timestamps: true, // Tự động quản lý createdAt và updatedAt
});

export default ForgotPassword;
