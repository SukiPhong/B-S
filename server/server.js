require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./configs/dbconfig");
const initRouters = require("./routers/index");
const { createServer } = require("http");
const bodyParser = require("body-parser");
const app = express();
const httpServer = createServer(app);
const jwt = require("jsonwebtoken");
const { Server } = require("socket.io");

app.use(
  cors({
    // origin: process.env.CLIENT_URL.split(','),  // Phân tách nhiều giá trị nếu có
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
const io = new Server(httpServer, {
  cors: {
    // origin: process.env.CLIENT_URL,
    origin: "http://localhost:5173", //port  right
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Token not provided"));
  }
  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err);
      return next(new Error("Invalid token"));
    }
    socket.userId = decoded.userId;
    socket.isAdmin = decoded.Role;
    next();
  });
});
io.on("connection", (socket) => {
  console.log("User connected:", socket.userId);

  socket.on("sendMessage", (data) => {
    if (!data.receiverId) {
      console.error("Receiver ID is missing in the data.");
      return; // Stop if receiverId is undefined
    }
    io.to(`user_${data.receiverId}`).emit("receiveMessage", data);
  });

  socket.on("adminNotification", (data) => {
    if (socket.isAdmin) {
      io.to("admin_room").emit("adminEvent", data);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.userId);
  });
});

connectDatabase();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
const port = process.env.PORT || 5100;

initRouters(app);
app.set('io', io);
const listener = httpServer.listen(port, () => {
  console.log(`:::Server is running on port ${listener.address().port}`);
});
// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     method: ["POST", "PUT", "DELETE", "GET","PATCH"]
// }))
// const listener = app.listen(port, () => {
//   console.log(`:::Server is running on port ${listener.address().port}`);
// });
