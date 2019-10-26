import * as Sequelize from 'sequelize'
import database from '../services/database'

class CurrencyRate extends Sequelize.Model {}
CurrencyRate.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rate: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
  sequelize: database,
  timestamps: true,
  updatedAt: false,
  modelName: 'currencyRate'
})

export default CurrencyRate