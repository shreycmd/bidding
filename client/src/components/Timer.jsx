import React, { useEffect, useState } from "react";

const Timer = ({ endTime }) => {
  const [time, setTime] = useState("");
  function msToHMS(ms) {
    if (ms <= 0) return "00:00:00";

    const totalSeconds = Math.floor(ms / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0")
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = new Date(endTime).getTime() - Date.now();

      setTime(msToHMS(diff));

      if (diff <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return <span>{time}</span>;
};

export default Timer;
