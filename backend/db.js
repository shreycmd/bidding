import mongoose from "mongoose";

export const connectDb = async (URL) => {
  try {
    const db = await mongoose.connect(`${URL}/bidding`);
    console.log("Db connected");
  } catch (error) {
    if (error) {
      console.log("db not connected");
    }
  }
};

const schema_auction = new mongoose.Schema({
  id: Number,
  itemName: String,
  startingPrice: Number,
  currentBid: Number,
  auctionEndTime: Date,
  highestBidder: String,
  imageUrl: String,
});
export const auctionModel = mongoose.model("Auction", schema_auction);
