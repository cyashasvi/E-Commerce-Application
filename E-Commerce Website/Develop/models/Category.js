const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: { 
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    }
  },
  {
    sequelize: sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
