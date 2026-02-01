import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemCard from "./ItemCard";

const BiddingArea = () => {
  const { userName } = useParams();
  const [aucItems, setaucItems] = useState([]);
  const getAll = async () => {
    const response = await fetch(
      `http://localhost:3000/biddingArea/${userName}`,
    );
    const result = await response.json();

    return result.items;
  };
  useEffect(() => {
    const makerequest = async () => {
      const items = await getAll();
      setaucItems(items);
    };
    makerequest();
  }, []);
  console.log(aucItems);
  return (
    <div className="w-100 h-screen flex justify-center items-center">
      {aucItems.map((item) => (
        <ItemCard
          key={item.id}
          itemName={item.itemName}
          startingPrice={item.startingPrice}
          currentBid={item.currentBid}
        />
      ))}
    </div>
  );
};

export default BiddingArea;
