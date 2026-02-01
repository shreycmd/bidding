import http from "http";
import { WebSocketServer } from "ws";
import express from "express";
import { v4 as uuidv4 } from "uuid";
import { auctionModel } from "./db.js";

const app = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

//all connections and user
const connections = {};
const users = {};

const Broadcast = async (connections, uid, payload) => {
  const cuser = Object.keys(connections);
  cuser.forEach((con_id) => {
    if (con_id != uid) {
      const con = connections[con_id];
      const message = JSON.stringify(payload);
      con.send(message);
    }
  });
};
const d_broadcast = async (connections, mess) => {
  const cuser = Object.keys(connections);
  cuser.forEach((id) => {
    connections[id].send(JSON.stringify(mess));
  });
};
//websocket connection
wss.on("connection", async (connection, request) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  console.log(url);

  const name = url.searchParams.get("userName");
  // const all_item = await auctionModel.find({});
  // console.log("auc items", all_item);
  const uuid = uuidv4();
  connections[uuid] = connection;
  users[uuid] = name;

  // console.log("----------", users);
  connection.on("message", async (data) => {
    const f_data = JSON.parse(data.toString());
    // console.log("data over socket", f_data);
    // d_broadcast(connections, f_data);
    if (data) {
      console.log("something came", JSON.parse(data.toString()));
    }

    const { id: itemId, bid_amt } = f_data;
    const previtem = await auctionModel.findOne({ id: itemId });
    const prevowner = previtem?.highestBidder;
    // console.log("--------prev",prevowner)
    const result = await auctionModel.findOneAndUpdate(
      {
        id: itemId,
        currentBid: { $lt: bid_amt },
        auctionEndTime: { $gt: new Date() },
      },
      {
        $set: {
          currentBid: bid_amt,
          highestBidder: name,
        },
      },
      { new: true },
    );
    if (!result) {
      connection.send(
        JSON.stringify({
          type: "BID_REJECTED",
          message: "OUTBID_OR_ENDED",
        }),
      );
      return;
    } else {
      connection.send(
        JSON.stringify({
          type: "BID_ACCEPTED",
          message: "highest bidder at the moment",
          newamt: result.currentBid,
          owner_token: 1,
          highestBidder: result.highestBidder,
          id: result.id,
        }),
      );
    }

    Broadcast(connections, uuid, {
      type: "BID_UPDATE",
      id: result.id,
      currentBid: result.currentBid,
      highestBidder: result.highestBidder,
    });
    if (prevowner && prevowner != name) {
      const con_id = Object.keys(users);

      const userid = con_id.find((uid) => users[uid] === prevowner);

      // console.log("----", userid);
      const payload = JSON.stringify({
        type: "Out_Bid",
        message: ` No longer highest bidder for ${result.itemName} `,
        owner_token: 0,
      });
      connections[userid].send(payload);
    }
  });
  connection.on("close", () => {
    delete connections[uuid];
    delete users[uuid];
  });
});

export { wss, app, server };
// data = {
//   type: "Bid_placed",
//   id: "id of item",
//   price: "price ",
//   time_placed: "time at which bid placed",
// };
// its just moock data from frontend
