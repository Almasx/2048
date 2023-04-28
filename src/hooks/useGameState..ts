/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useCallback, useEffect, useState } from "react";

import { api } from "~/utils/api";
import { difficultyAtom } from "~/pages";
import { useAtomValue } from "jotai";

export type Board = number[][];

export type Direction = 0 | 1 | 2 | 3;

export const boardLength = { hard: 3, medium: 4, easy: 5 };

export function useGameState(onGameOver: (score: number) => void) {
  const [board, setBoard] = useState<Board>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const difficulty = useAtomValue(difficultyAtom);

  const addNewTile = useCallback((board: Board) => {
    const emptyCells = board
      .flatMap((row, rowIndex) =>
        row.map((cell, columnIndex) => (!cell ? [rowIndex, columnIndex] : []))
      )
      .filter((indexes) => indexes.length > 0);

    if (emptyCells.length === 0) {
      return false;
    }

    const [row, col] = emptyCells[
      Math.floor(Math.random() * emptyCells.length)
    ] as number[];

    board[row!]![col!] = Math.random() < 0.9 ? 2 : 4;
    return true;
  }, []);

  const initializeBoard = useCallback(() => {
    const newBoard = Array.from({ length: boardLength[difficulty] }, () =>
      Array.from({ length: boardLength[difficulty] }, () => 0)
    );

    addNewTile(newBoard);
    addNewTile(newBoard);
    setBoard(newBoard);
    setGameOver(false);
    setScore(0);
  }, [addNewTile, difficulty]);

  const checkGameOver = useCallback(
    (board: Board) => {
      const canMove = (board: Board) => {
        for (let row = 0; row < board.length; row++) {
          for (let col = 0; col < board[row]!.length; col++) {
            if (board[row]?.[col] === 0) {
              return true;
            }

            if (
              (row < board.length - 1 &&
                board[row]?.[col] === board[row + 1]?.[col]) ||
              (col < board[row]!.length - 1 &&
                board[row]?.[col] === board[row]?.[col + 1])
            ) {
              return true;
            }
          }
        }
        return false;
      };

      if (!canMove(board)) {
        onGameOver(score);
        setGameOver(true);
      } else {
        setGameOver(false);
      }
    },
    [score]
  );

  const moveBoard = useCallback(
    (direction: Direction) => {
      const oldBoard = board.slice(0);
      let newScore = score;

      const rotateLeft = (matrix: Board) => {
        return matrix[0]
          ?.map((_, colIndex) => matrix.map((row) => row[colIndex]))
          .reverse() as Board;
      };

      const moveRow = (row: number[]) => {
        const newRow = row.filter((value) => value !== 0);
        const missingCells = Array<number>(row.length - newRow.length).fill(0);
        newRow.push(...missingCells);
        return newRow;
      };

      const mergeRow = (row: number[]) => {
        for (let i = 0; i < row.length - 1; i++) {
          if (row[i] === row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            newScore += row[i] as number;
          }
        }
        return moveRow(row);
      };

      const moveMatrix = (matrix: Board) => {
        return matrix.map((row) => mergeRow(moveRow(row)));
      };

      let newBoard = board;
      for (let i = 0; i < direction; i++) {
        newBoard = rotateLeft(newBoard);
      }

      newBoard = moveMatrix(newBoard);

      for (let i = 0; i < 4 - direction; i++) {
        newBoard = rotateLeft(newBoard);
      }

      if (JSON.stringify(oldBoard) !== JSON.stringify(newBoard)) {
        addNewTile(newBoard);
        setBoard(newBoard);
        setScore(newScore);
        checkGameOver(newBoard);
      }
    },
    [board, score, checkGameOver, addNewTile]
  );

  useEffect(() => {
    initializeBoard();
  }, [initializeBoard]);

  return {
    board,
    score,
    gameOver,
    moveBoard,
    initializeBoard,
  };
}
