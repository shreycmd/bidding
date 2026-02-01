import { configDotenv } from "dotenv";
import { app, server } from "./Socket.js";
import { auctionModel, connectDb } from "./db.js";
import { seedAuctions } from "./seed.js";
import cors from "cors";
app.use(cors());

configDotenv();
app.get("/", (req, res) => {
  seedAuctions();
  return;
});
app.get("/biddingarea/:userName", async (req, res) => {
  const aucItem = await auctionModel.find({});

  return res.json({ message: "welcome", items: aucItem });
});
server.listen(3000, () => {
  connectDb(process.env.MONGO_URL);

  console.log("server is running");
});
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
