import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export class Donation extends Model {}

Donation.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  donorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'donors',
      key: 'id',
    },
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Donation',
  tableName: 'donations',
  timestamps: true,
});