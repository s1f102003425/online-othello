import type { UserId } from '$/commonTypesWithClient/branded';
import { colorUseCase } from './colorUseCase';

const board: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 0, 0, 0],
  [0, 0, 0, 2, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
const directions = [
  [-1, -1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [1, 0],
  [0, 1],
  [1, -1],
  [-1, 1],
];
let turnColor = 1;
export const boardUseCase = {
  getBoard: () => board,
  clickBoard: (x: number, y: number, userId: UserId): number[][] => {
    console.log('ユーザーがタッチしたのは', x, y);
    const newBoard = board.concat();
    let ok = false;
    for (const direction of directions) {
      if (board[y + direction[1]] === undefined) {
        continue;
      }
      if (
        turnColor === colorUseCase.createColor(userId) &&
        board[y][x] === 0 &&
        board[y + direction[1]][x + direction[0]] === 3 - colorUseCase.createColor(userId)
      ) {
        for (let i = 1; i < 8; i++) {
          if (board[y + i * direction[1]][x + i * direction[0]] === undefined) {
            break;
          } else if (board[y + i * direction[1]][x + i * direction[0]] === 0) {
            break;
          } else if (
            board[y + i * direction[1]][x + i * direction[0]] ===
            3 - colorUseCase.createColor(userId)
          ) {
            continue;
          } else if (
            board[y + i * direction[1]][x + i * direction[0]] === colorUseCase.createColor(userId)
          ) {
            for (let j = i; j > 0; j--) {
              newBoard[y + j * direction[1]][x + j * direction[0]] =
                colorUseCase.createColor(userId);
            }
            ok = true;
            break;
          }
        }
      }
    }
    if (ok) {
      for (let iY = 0; iY < 8; iY++) {
        for (let iX = 0; iX < 8; iX++) {
          board[iY][iX] = newBoard[iY][iX];
        }
      }
      board[y][x] = colorUseCase.createColor(userId);
      turnColor = 3 - turnColor;
    }
    return board;
  },
};
