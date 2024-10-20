require("dotenv").config();
module.exports = {
    development: {
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
        timezone: "+07:00"
    },
    production: {
        username: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: false,
        timezone: "+07:00",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
}   