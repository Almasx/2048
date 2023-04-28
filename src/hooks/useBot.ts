import { useAtomValue } from "jotai";
import { type Direction } from "./useGameState.";
import { useEffect, useState } from "react";
import { botAtom } from "~/pages";

export function useTime() {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return seconds;
}

export function useBot(moveBoard: (moveBoard: Direction) => void) {
  const bot = useAtomValue(botAtom);
  const time = useTime();
  useEffect(() => {
    bot && moveBoard(Math.floor(Math.random() * 4) as Direction);
  }, [time]);
}
