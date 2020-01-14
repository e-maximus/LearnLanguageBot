const Sequelize = require('sequelize')

let database = null;

export default () => {
  database = new Sequelize(process.env.POSTGRES_CONNECT_URI)
  return database
}
