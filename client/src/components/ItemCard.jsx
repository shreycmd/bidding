import React, { useEffect, useState } from "react";
import img from "../assets/react.svg";
const ItemCard = ({ itemName, startingPrice, currentBid, id, aucItem }) => {
  const [item, setItem] = useState({});

  return (
    <div className="w-3xs h-52 bg-blue-100 rounded-2xl shadow-xl flex flex-col items-center justify-center">
      <img src={img} />
      <div>
        <div>name:{itemName}</div>
        <div>startingPrice:{startingPrice}</div>
        <div> currentBid:{currentBid}</div>
      </div>
    </div>
  );
};

export default ItemCard;
