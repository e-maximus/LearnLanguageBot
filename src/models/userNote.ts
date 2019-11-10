import * as Sequelize from 'sequelize'
import database from '../services/database'

class UserNote extends Sequelize.Model {
  id: number
  user_id: number
  text: string
  created_at: Date
}
UserNote.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: Sequelize.BIGINT,
    allowNull: false
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
  sequelize: database,
  timestamps: true,
  updatedAt: false,
  createdAt: 'created_at',
  modelName: 'user_note',
  indexes: [
    {
      fields: ['user_id']
    }
  ]
})

export default UserNote