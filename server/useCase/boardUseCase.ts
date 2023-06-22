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
export const boardUseCase = {
  getBoard: () => board,
  clickBoard: (x: number, y: number, userId: UserId): number[][] => {
    console.log(111, x, y);
    board[y][x] = colorUseCase.createColor(userId);
    return board;
  },
};
