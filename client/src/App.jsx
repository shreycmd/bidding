import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import BiddingArea from "./components/BiddingArea";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/biddingarea/:userName" element={<BiddingArea />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
