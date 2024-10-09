import { DataTypes, DATE } from "sequelize";
import sequelize from "../config/database";
import slugify from "slugify";
const Tour = sequelize.define("Tour", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    code: {
        type: DataTypes.STRING(10)
    },
    images: {
        type: DataTypes.TEXT("long")
    },
    price: {
        type: DataTypes.INTEGER
    },
    discount: {
        type: DataTypes.INTEGER
    },
    information: {
        type: DataTypes.TEXT("long")
    },
    schedule: {
        type: DataTypes.TEXT("long")
    },
    timeStart: {
        type: DataTypes.DATE,
    },
    stock: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING(20)
    },
    position: {
        type: DataTypes.INTEGER,
    },
    slug : {
        type : DataTypes.STRING(255),
        allowNull : true
    },
    deleted : {
        type : DataTypes.BOOLEAN,
        defaultValue : false 
    },
    deletedAt : {
        type : DataTypes.DATE
    }
}, {
    tableName : "tours" , 
    timestamps : true
});

Tour.beforeCreate((tour) => {
    tour["slug"] = slugify(`${tour["title"]}-${Date.now()}`, {
        replacement: '-',  // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: false,      // convert to lower case, defaults to `false`
        strict: false,     // strip special characters except replacement, defaults to `false`
        locale: 'vi',      // language code of the locale to use
        trim: true         // trim leading and trailing replacement chars, defaults to `true`
      })
})

export default Tour ;