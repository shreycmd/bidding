import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import { ToastContainer, toast, Bounce } from "react-toastify";

import useWebsocket from "react-use-websocket";
const BiddingArea = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const WS_URL = import.meta.env.VITE_WS_URL;

  const { userName } = useParams();
  const { sendJsonMessage, lastJsonMessage } = useWebsocket(
    `${WS_URL}/?userName=${userName}`,
  );
  const [aucItems, setaucItems] = useState([]);
  const getAll = async () => {
    const response = await fetch(`${API_URL}/biddingarea/${userName}`);
    const result = await response.json();

    return result.items;
  };
  useEffect(() => {
    const makerequest = async () => {
      const items = await getAll();
      setaucItems(items);
    };
    makerequest();
  }, [userName]);
  useEffect(() => {
    if (!lastJsonMessage) return;
    const data = lastJsonMessage;
    if (data.type == "BID_UPDATE") {
      setaucItems((prev) =>
        prev.map((item) =>
          item.id == data.id
            ? {
                ...item,
                currentBid: data.currentBid,
                highestBidder: data.highestBidder,
              }
            : item,
        ),
      );
    }
    if (data.type === "BID_REJECTED") {
      const notify = () => {
        toast(data.message);
      };
      console.log("data recieved over socket", data);

      notify();
    }

    if (data.type === "BID_ACCEPTED") {
      console.log("hhsj", data);
      setaucItems((prev) =>
        prev.map((item) =>
          item.id == data.id
            ? {
                ...item,
                currentBid: data.newamt,
                highestBidder: data.highestBidder,
              }
            : item,
        ),
      );
      console.log("done up");
    }

    if (data.type === "Out_Bid") {
      const notify = () => {
        toast(data.message);
      };
      console.log("data recieved over socket", data);

      notify();
    }
  }, [lastJsonMessage]);

  const placebid = (id, bid_amt) => {
    // const curitem = aucItems.find((item) => item.id == id);
    // if (bid_amt <= curitem.currentBid && new Date() > curitem.auctionEndTime) {
    //   alert("poor bid");
    // } else {
    //   setaucItems((prev) =>
    //     prev.map((item) =>
    //       item.id == id
    //         ? { ...item, currentBid: bid_amt, highestBidder: userName }
    //         : item,
    //     ),
    //   );
    //   sendJsonMessage({ type: "Place_bid", id, bid_amt });
    // }
    sendJsonMessage({ type: "Place_bid", id, bid_amt });
  };
  console.log(aucItems);
  return (
    <div className="w-screen h-screen flex flex-wrap justify-center gap-3 items-center">
      {aucItems.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          itemName={item.itemName}
          startingPrice={item.startingPrice}
          currentBid={item.currentBid}
          highestBidder={item.highestBidder}
          onBid={placebid}
          timer={item.auctionEndTime}
        />
      ))}
      <ToastContainer
        position="bottom-left"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default BiddingArea;
