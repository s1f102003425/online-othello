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
const candidateCondition = (
  board: number[][],
  subX: number,
  subY: number,
  i: number,
  direction: number[],
  turnColor: number
) => {
  return board[subY + i * direction[1]][subX + i * direction[0]] === 3 - turnColor;
};
const continueCondition = (
  board: number[][],
  subX: number,
  subY: number,
  i: number,
  direction: number[],
  turnColor: number
) => {
  return board[subY + i * direction[1]][subX + i * direction[0]] === turnColor;
};
const breakCondition = (
  board: number[][],
  subX: number,
  subY: number,
  i: number,
  direction: number[]
) => {
  return (
    board[subY + i * direction[1]] === undefined ||
    board[subY + i * direction[1]][subX + i * direction[0]] === undefined ||
    board[subY + i * direction[1]][subX + i * direction[0]] === 0
  );
};
const makeACandidate = (
  board: number[][],
  turnColor: number,
  subX: number,
  subY: number,
  direction: number[]
) => {
  for (let i = 1; i < 8; i++) {
    if (breakCondition(board, subX, subY, i, direction)) {
      break;
    } else if (continueCondition(board, subX, subY, i, direction, turnColor)) {
      continue;
    } else if (candidateCondition(board, subX, subY, i, direction, turnColor)) {
      board[subY][subX] = -1;
      return true;
    }
  }
  return false;
};
const isInitialCandidate = (
  board: number[][],
  turnColor: number,
  subX: number,
  subY: number,
  direction: number[]
) => {
  return (
    board[subY + direction[1]] !== undefined &&
    board[subY][subX] === 0 &&
    board[subY + direction[1]][subX + direction[0]] === turnColor
  );
};

const processDirections = (board: number[][], turnColor: number, subX: number, subY: number) => {
  for (const direction of directions) {
    if (isInitialCandidate(board, turnColor, subX, subY, direction)) {
      if (makeACandidate(board, turnColor, subX, subY, direction)) return true;
    }
  }
  return false;
};
export const candidateUseCase = {
  // makeCandidate: (board: number[][], turnColor: number) => {
  //   let candidateOk = false;
  //   for (let subX = 0; subX < 8; subX++) {
  //     for (let subY = 0; subY < 8; subY++) {
  //       for (const direction of directions) {
  //         if (
  //           board[subY + direction[1]] !== undefined &&
  //           board[subY][subX] === 0 &&
  //           board[subY + direction[1]][subX + direction[0]] === turnColor
  //         ) {
  //           for (let i = 1; i < 8; i++) {
  //             if (
  //               board[subY + i * direction[1]] === undefined ||
  //               board[subY + i * direction[1]][subX + i * direction[0]] === undefined ||
  //               board[subY + i * direction[1]][subX + i * direction[0]] === 0
  //             ) {
  //               break;
  //             } else if (board[subY + i * direction[1]][subX + i * direction[0]] === turnColor) {
  //               continue;
  //             } else if (
  //               board[subY + i * direction[1]][subX + i * direction[0]] ===
  //               3 - turnColor
  //             ) {
  //               board[subY][subX] = -1;
  //               candidateOk = true;
  //               break;
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  //   return candidateOk;
  // },

  makeCandidate: (board: number[][], turnColor: number) => {
    let candidateOk = false;
    for (let subX = 0; subX < 8; subX++) {
      for (let subY = 0; subY < 8; subY++) {
        candidateOk = processDirections(board, turnColor, subX, subY) || candidateOk;
      }
    }
    return candidateOk;
  },
};
