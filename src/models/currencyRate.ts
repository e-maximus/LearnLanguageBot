import * as Sequelize from 'sequelize'

export class CurrencyRate extends Sequelize.Model {
  id: number
  rate: number
  created_at: Date
}
export const init = async (database: Sequelize) => {
  CurrencyRate.init({
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    rate: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    sequelize: database,
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
    modelName: 'currency_rate'
  })
}
