import { DataTypes, DATE } from "sequelize";
import sequelize from "../config/database";
const TourCategory = sequelize.define("TourCategory", {
    tour_id : {
        type : DataTypes.INTEGER,
        allowNull : false ,
        primaryKey : true ,
        references : {
            model : 'tours' , // tên bảng mà khóa ngoại tham chiếu đến
            key : "id"
        }
    },
    category_id : {
        type : DataTypes.INTEGER,
        allowNull : false ,
        primaryKey : true ,
        references : {
            model : 'categories' , // Tên bảng mà khóa ngoại tham chiếu đến
            key : 'id' ,// tên trường trong bảng mà khóa ngoại tham chiếu đến
        }
    }
}, {
    tableName : "tours_categories" , 
    timestamps : true
});

export default TourCategory ;