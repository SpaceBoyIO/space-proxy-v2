const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const { launchBrowser } = require("./browser");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ noServer: true });

const PORT = process.env.PORT || 8080;

// Serve frontend folder (optional if hosting frontend separately)
app.use(express.static("../client"));

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, ws => {
    wss.emit("connection", ws, req);
  });
});

wss.on("connection", ws => {
  launchBrowser(ws);
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});