const http = require("http");
const fs = require("fs");
const path = require("path");
const WebSocket = require("ws");
const watch = require("node-watch");

const browserJsContents = fs.readFileSync(path.join(__dirname, "browser.js"));

const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws, filename) => {
  // client got connected ...
  // when a file got updated notify the browser
  if (filename) {
    watch(filename, { recursive: true }, () => {
      ws.send("reload");
    });
  }
});

function browsermon({ server, filename }) {
  if (process.env.NODE_ENV === "production") {
    // do nothing in production ...
    return;
  }

  if (!server instanceof http.Server) {
    throw new Error("Expecting an http.Server instance");
  }

  server.on("request", (req, res) => {
    if (req.url === "/browsermon/browser.js") {
      res.setHeader("Content-Type", "text/javascript");
      res.statusCode = 200;
      res.end(browserJsContents);
    }
  });

  server.on("upgrade", (req, socket, head) => {
    if (req.url === "/browsermon") {
      wss.handleUpgrade(req, socket, head, (ws, req) => {
        wss.emit("connection", ws, filename);
      });
    }
  });
}

module.exports = browsermon;
