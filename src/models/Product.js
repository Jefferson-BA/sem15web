const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./Category');

const Product = sequelize.define('Product', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  descripcion: { type: DataTypes.TEXT },
  imageUrl: { type: DataTypes.STRING }
});

Product.belongsTo(Category, { foreignKey: 'categoryId' });

module.exports = Product;
