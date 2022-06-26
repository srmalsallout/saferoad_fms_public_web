import React from "react";
import Styles from "../../styles/MenuBottom.module.scss";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const MenuBottom = ({ duration }) => {
  const children = ({ remainingTime }) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = Math.round(remainingTime % 60);

    return (
      <div className="timer">
        <div className="text">Remaining</div>
        <div className="value">
          {minutes}:{seconds}
        </div>
        <div className="text">Minutes</div>
      </div>
    );
  };
  return (
    <>
      <div
        title="The Track will end after"
        className={`${Styles.menu_bottom_main} d-flex position-absolute`}
      >
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          colors={["#246c66", "#f54242"]}
          colorsTime={[7, 7]}
          size={95}
          strokeWidth={6}
          strokeLinecap="round"
          rotation="clockwise"
        >
          {children}
        </CountdownCircleTimer>
      </div>
    </>
  );
};

export default MenuBottom;
