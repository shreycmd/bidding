import { app, server } from "./Socket.js";
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
app.get("/", (req, res) => {
  return res.json({ message: "welcome", items: auctionItem });
});
server.listen(3000, () => {
  console.log("server is running");
});
