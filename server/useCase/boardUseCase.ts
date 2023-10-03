import type { UserId } from '$/commonTypesWithClient/branded';
import { candidateUseCase } from './candidateUseCase';
import { colorUseCase } from './colorUseCase';

const defaultBoard: number[][] = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, -0, 0],
  [0, 0, 0, -1, 0, 0, 0, 0],
  [0, 0, -1, 2, 1, 0, 0, 0],
  [0, 0, 0, 1, 2, -1, 0, 0],
  [0, 0, 0, 0, -1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
let board: number[][] = JSON.parse(JSON.stringify(defaultBoard));
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
const zeroToSeven = [...Array(8)].map((_, i) => i);
const getNewBoard = (board: number[][], x: number, y: number) => {
  let newBoard = board.concat();
  if (board[y][x] === -1) {
    newBoard = board.map((row) => {
      return row.map((value) => {
        return value === -1 ? 0 : value;
      });
    });
  }
  return newBoard;
};
export const boardUseCase = {
  getBoard: () => board,

  clickBoard: (x: number, y: number, userId: UserId): number[][] => {
    console.log('ユーザーがタッチしたのは', x, y);
    const newBoard = getNewBoard(board, x, y);
    let ok = false;
    for (const direction of directions) {
      if (board[y + direction[1]] === undefined) {
        continue;
      }
      if (
        turnColor === colorUseCase.createColor(userId) &&
        board[y][x] <= 0 &&
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
      zeroToSeven.forEach((Y) => {
        zeroToSeven.forEach((X) => {
          board[Y][X] = newBoard[Y][X];
        });
      });
      board[y][x] = colorUseCase.createColor(userId);
      // candidateUseCase.makeCandidate(board, turnColor);
      // let candidateCount = 0;
      // board.map((row) => row.map((n) => n === -1 && candidateCount++));
      // console.log(`候補地は${candidateCount}個`);
      if (candidateUseCase.makeCandidate(board, turnColor)) {
        turnColor = 3 - turnColor;
      } else if (candidateUseCase.makeCandidate(board, 3 - turnColor)) {
        turnColor;
      } else {
        console.log('GameEnd');
      }
    }
    console.log(`${turnColor === 1 ? '黒' : '白'}のターンです`);
    return board;
  },
  restartClick: (userId: UserId): number[][] => {
    board = JSON.parse(JSON.stringify(defaultBoard));
    turnColor = 1;
    console.log(userId);
    return board;
  },
};

// export const boardUseCase = {
//   getBoard: () => board,
//   clickBoard: (x: number, y: number, userId: UserId): number[][] => {
//     console.log('ユーザーがタッチしたのは', x, y);
//     let newBoard = board.concat();
//     if (board[y][x] === -1) {
//       newBoard = board.map((row) => {
//         return row.map((value) => {
//           return value === -1 ? 0 : value;
//         });
//       });
//     }
//     let ok = false;
//     for (const direction of directions) {
//       if (board[y + direction[1]] === undefined) {
//         continue;
//       }
//       if (
//         turnColor === colorUseCase.createColor(userId) &&
//         board[y][x] <= 0 &&
//         board[y + direction[1]][x + direction[0]] === 3 - colorUseCase.createColor(userId)
//       ) {
//         for (let i = 1; i < 8; i++) {
//           if (board[y + i * direction[1]][x + i * direction[0]] === undefined) {
//             break;
//           } else if (board[y + i * direction[1]][x + i * direction[0]] === 0) {
//             break;
//           } else if (
//             board[y + i * direction[1]][x + i * direction[0]] ===
//             3 - colorUseCase.createColor(userId)
//           ) {
//             continue;
//           } else if (
//             board[y + i * direction[1]][x + i * direction[0]] === colorUseCase.createColor(userId)
//           ) {
//             for (let j = i; j > 0; j--) {
//               newBoard[y + j * direction[1]][x + j * direction[0]] =
//                 colorUseCase.createColor(userId);
//             }
//             ok = true;
//             break;
//           }
//         }
//       }
//     }
//     if (ok) {
//       zeroToSeven.forEach((Y) => {
//         zeroToSeven.forEach((X) => {
//           board[Y][X] = newBoard[Y][X];
//         });
//       });
//       board[y][x] = colorUseCase.createColor(userId);
//       // candidateUseCase.makeCandidate(board, turnColor);
//       // let candidateCount = 0;
//       // board.map((row) => row.map((n) => n === -1 && candidateCount++));
//       // console.log(`候補地は${candidateCount}個`);
//       if (candidateUseCase.makeCandidate(board, turnColor)) {
//         turnColor = 3 - turnColor;
//       } else if (candidateUseCase.makeCandidate(board, 3 - turnColor)) {
//         turnColor;
//       } else {
//         console.log('GameEnd');
//       }
//     }
//     console.log(`${turnColor === 1 ? '黒' : '白'}のターンです`);
//     return board;
//   },
//   restartClick: (userId: UserId): number[][] => {
//     board = JSON.parse(JSON.stringify(defaultBoard));
//     turnColor = 1;
//     console.log(userId);
//     return board;
//   },
// };
