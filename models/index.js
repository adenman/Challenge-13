// import models
const Sequelize = require('sequelize');
require('dotenv').config(); // To load environment variables from a .env file

const sequelize = new Sequelize(process.env.DB_URI, {
  dialect: 'postgres', // or 'postgres', 'sqlite', etc.
  logging: false,
});
const Product = require("./Product");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: "category_id",
});
// Categories have many Products
Category.hasMany(Product, {
as: "products"
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: "tags",
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  as: "products",
});
module.exports = {
  sequelize,
  Product,
  Category,
  Tag,
  ProductTag,
};
