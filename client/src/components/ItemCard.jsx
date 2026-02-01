import React, { memo } from "react";
import img from "../assets/react.svg";
import Timer from "./Timer";
import clsx from "clsx";

import { useParams } from "react-router-dom";
const ItemCard = ({
  itemName,
  startingPrice,
  currentBid,
  id,
  onBid,
  highestBidder,

  timer,
}) => {
  // setamt(currentBid);
  const { userName } = useParams();
  return (
    <div
      className={clsx(
        "w-[260px] rounded-2xl shadow-xl flex flex-col items-center gap-4 p-4 transition-all duration-300",
        new Date(timer) < new Date()
          ? "bg-gray-300 opacity-70"
          : "bg-blue-100 hover:shadow-2xl hover:-translate-y-1",
      )}
    >
      <img
        src={img}
        alt={itemName}
        className="w-full h-[140px] object-cover rounded-xl"
      />

      <div className="w-full flex flex-col gap-2 text-sm">
        <div className="font-semibold text-base text-center">{itemName}</div>

        <div className="flex justify-between">
          <span className="text-gray-600">Starting</span>
          <span>{startingPrice}</span>
        </div>

        <div
          className={clsx(
            "flex justify-between font-semibold",
            highestBidder !== userName ? "text-red-500" : "text-green-600",
          )}
        >
          <span>Current Bid</span>
          <span>{currentBid}</span>
        </div>

        <div
          className={clsx(
            "flex justify-between text-sm",
            highestBidder !== userName ? "text-red-500" : "text-green-600",
          )}
        >
          <span>Highest Bidder</span>
          <span>{highestBidder || "No one"}</span>
        </div>

        <div className="text-center font-mono text-sm bg-white/50 rounded-md py-1">
          <Timer endTime={timer} />
        </div>

        {userName === highestBidder && (
          <div className="bg-green-200 text-green-800 text-center font-semibold rounded-md py-1">
            Winning
          </div>
        )}
      </div>

      <button
        disabled={new Date(timer) < new Date()}
        className={clsx(
          "w-full py-2 rounded-lg border-2 font-semibold transition",
          new Date(timer).getTime() < new Date()
            ? "cursor-not-allowed bg-gray-400 text-gray-700"
            : "border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white",
        )}
        onClick={() => onBid(id, currentBid + 10)}
      >
        Place Bid
      </button>
    </div>
  );
};

export default memo(ItemCard);
