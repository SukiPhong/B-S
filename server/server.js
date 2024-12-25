require("dotenv").config()

const express = require('express')
const cors = require('cors')
const { connectDatabase } = require("./configs/dbconfig")
const initRouters = require("./routers/index")
const bodyParser = require('body-parser');
const app = express()
// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     method: ["POST", "PUT", "DELETE", "GET","PATCH"]
// }))
app.use(cors({
    // origin: process.env.CLIENT_URL.split(','),  // Phân tách nhiều giá trị nếu có
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
  }));
connectDatabase()
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
const port = process.env.PORT || 5100

initRouters(app)
const listener = app.listen(port, () => {
    console.log(`:::Server is running on port ${listener.address().port}`)
})
