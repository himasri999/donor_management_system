import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export class Communication extends Model {}

Communication.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  donorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  communicationType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  communicationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Communication',
  tableName: 'communications',
  timestamps: true,
});