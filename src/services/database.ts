const Sequelize = require('sequelize')

console.log('process.env.POSTGRES_CONNECT_URI', process.env.POSTGRES_CONNECT_URI)

const database = new Sequelize(process.env.POSTGRES_CONNECT_URI);

export default database