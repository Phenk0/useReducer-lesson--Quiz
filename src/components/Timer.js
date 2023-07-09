import { useEffect } from "react";

function Timer({ dispatch, secondsRemained }) {
  useEffect(
    function () {
      const tickId = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return function () {
        clearInterval(tickId);
      };
    },
    [dispatch]
  );
  // const time = new Date(secondsRemained * 1000).getTime();
  const minutes = Math.floor(secondsRemained / 60);
  const seconds = secondsRemained % 60;

  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  return <div className="timer">{formattedTime}</div>;
}

export default Timer;
