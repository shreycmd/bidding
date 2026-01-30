import http from "http";
import { WebSocketServer } from "ws";
import express from "express";
import { v4 as uuidv4 } from "uuid";
const app = express();
const port = 3000;
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
//all connections and user
const connections = {};
const users = {};
const auctionItem = [
  {
    id: 1,
    title: "Vintage Camera",
    startingPrice: 5000,
    currentBid: 7500,
    auctionEndTime: "2026-02-05T18:30:00Z",
  },
  {
    id: 2,
    title: "Gaming Laptop",
    startingPrice: 45000,
    currentBid: 62000,
    auctionEndTime: "2026-02-10T15:00:00Z",
  },
  {
    id: 3,
    title: "Smart Watch",
    startingPrice: 3000,
    currentBid: 4800,
    auctionEndTime: "2026-02-01T12:00:00Z",
  },
];
//websocket connection
wss.on("connection", (connection, request) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const name = url.searchParams.get("userName");

  const uuid = uuidv4();
  connections[uuid] = connection;
  users[uuid] = {
    userName: name,
    bid_item: "",
    placed_bid: "",
    end_time: "",
  };
  console.log("all users", users);

  //   console.log("all connection", connections);
});

app.get("/", (req, res) => {
  return res.json({ message: "welcome", items: auctionItem });
});
server.listen(port, () => {
  console.log("server is running");
});
