const { Sequelize } = require('sequelize');


const dbname = process.env.DB_NAME

const dbuser = process.env.DB_USER

const dbpassword = process.env.DB_PASSWORD

const dbhost = process.env.DB_HOST

const dbdialect = process.env.DB_DIALECT



const sequelize = new Sequelize(dbname, dbuser, dbpassword, {
    host: dbhost,
    dialect: dbdialect,
    logging: false
});
const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log(':::Connection has been established successfully.');
    } catch (error) {
        console.error(':::Unable to connect to the database:', error);
    }
}

module.exports = {

    connectDatabase
}