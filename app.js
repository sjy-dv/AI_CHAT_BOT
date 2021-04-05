const express = require("express");
const app = express();
const cors = require("cors");
const server = require("http").createServer(app).listen(8081);
const io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
const AI = require("./AI");

app.use(cors());

AI.init();

io.on("connection", (socket) => {
  socket.on("msg", async (obj) => {
    let reply = await AI.bot(obj.msg);
    io.emit("msg", obj);
    io.emit("replymsg", { user: "챗봇", msg: reply });
  });

  socket.on("disconnect", () => {});
});
