import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setuserName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userName.trim()) return;
    navigate(`/biddingArea/${userName}`);
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-xl font-semibold">
          Login your name to enter the bidding
        </h1>

        <input
          type="text"
          value={userName}
          className="border-2 rounded-2xl px-4 py-2"
          onChange={(e) => setuserName(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            onClick={(e) => handleSubmit(e)}
            className="border-2 w-fit px-2 py-2 rounded-2xl"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
