import { type Direction } from "./useGameState.";
import { useEffect } from "react";

export function useMove(moveBoard: (moveBoard: Direction) => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          moveBoard(1);
          break;
        case "ArrowRight":
          moveBoard(2);
          break;
        case "ArrowDown":
          moveBoard(3);
          break;
        case "ArrowLeft":
          moveBoard(0);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [moveBoard]);
}
