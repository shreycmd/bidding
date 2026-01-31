import { auctionModel } from "./db.js";

export async function seedAuctions() {
  const del = await auctionModel.deleteMany({});
  if (del.deletedCount >= 0) {
    console.log("cleared old data");
  }

  const now = Date.now();

  const dt = await auctionModel.insertMany([
    {
      id: 1,
      itemName: "Vintage Camera",
      startingPrice: 5000,
      currentBid: 5000,
      auctionEndTime: new Date(now + 10 * 60 * 1000),
    },
    {
      id: 2,
      itemName: "Gaming Laptop",
      startingPrice: 45000,
      currentBid: 45000,
      auctionEndTime: new Date(now + 15 * 60 * 1000),
    },
  ]);

  if (dt.length > 0) {
    console.log("data seeded");
  }
}
