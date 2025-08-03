"use client";
import React, { useState, useEffect } from "react";
import Countdown, { CountdownRenderProps } from "react-countdown";

const Counter: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const counterStyle = "rounded-lg bg-midnight-200 px-2";

  const renderer = ({ days, hours, minutes, seconds, completed }: CountdownRenderProps) => {
    if (completed) {
      return <span>Time's up!</span>;
    } else {
      return (
        <span className="flex gap-x-2">
          <p className={counterStyle}>{days}d</p>
          <p className={counterStyle}>{hours}h</p>
          <p className={counterStyle}>{minutes}m</p>
          <p className={counterStyle}>{seconds}s</p>
        </span>
      );
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <Countdown date={new Date("2025-10-01T00:00:00Z")} renderer={renderer} />
    </div>
  );
};

export default Counter;
