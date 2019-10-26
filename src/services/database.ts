const Sequelize = require('sequelize')

const database = new Sequelize(process.env.POSTGRES_CONNECT_URI);

export default database