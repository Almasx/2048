import { type Direction } from "./useGameState.";
import { useEffect, useRef } from "react";

export function useSwipe(onSwipe: (direction: Direction) => void) {
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      touchStart.current = {
        x: event.touches[0]!.clientX,
        y: event.touches[0]!.clientY,
      };
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const deltaX = event.changedTouches[0]!.clientX - touchStart.current.x;
      const deltaY = event.changedTouches[0]!.clientY - touchStart.current.y;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      if (absDeltaX < 25 && absDeltaY < 25) {
        return;
      }

      if (absDeltaX > absDeltaY) {
        onSwipe(deltaX > 0 ? 2 : 0);
      } else {
        onSwipe(deltaY > 0 ? 3 : 1);
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onSwipe]);
}

export function useKey(onKey: (direction: Direction) => void) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          onKey(1);
          break;
        case "ArrowRight":
          onKey(2);
          break;
        case "ArrowDown":
          onKey(3);
          break;
        case "ArrowLeft":
          onKey(0);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onKey]);
}

export const useMove = (onMove: (direction: Direction) => void) => {
  useSwipe(onMove);
  useKey(onMove);
};
