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
    auctionEndTime: new Date().getTime(),
  },
  {
    id: 2,
    title: "Gaming Laptop",
    startingPrice: 45000,
    currentBid: 62000,
    auctionEndTime: new Date().getTime(),
  },
  {
    id: 3,
    title: "Smart Watch",
    startingPrice: 3000,
    currentBid: 4800,
    auctionEndTime: new Date().getTime(),
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
  // data = {
  //   type: "Bid_placed",
  //   id: "id of item",
  //   price: "price ",
  //   time_placed: "time at which bid placed",
  // };
  // its just moock data from frontend
  connection.on("message", (data) => {
    const f_data = JSON.parse(JSON.tostringify(data));
    if (
      f_data.type == "Bid_placed" &&
      f_data.time_placed <= auctionItem[f_data.id].auctionEndTime
    ) {
      //then do the atomic operation for db query
      //then dothe brodcast for updated bid
    }
  });
  //   console.log("all connection", connections);
});

export { wss, app, server };
