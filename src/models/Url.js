import { DataTypes } from 'sequelize';
import sequelize from './sequelize';

const Url = sequelize.define('Url', {
  originalUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortUrl: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  clicks: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export default Url;
