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

export const candidateUseCase = {
  makeCandidate: (board: number[][], turnColor: number) => {
    for (let subX = 0; subX < 8; subX++) {
      for (let subY = 0; subY < 8; subY++) {
        for (const direction of directions) {
          if (
            board[subY + direction[1]] !== undefined &&
            board[subY][subX] === 0 &&
            board[subY + direction[1]][subX + direction[0]] === turnColor
          ) {
            for (let i = 1; i < 8; i++) {
              if (
                board[subY + i * direction[1]] === undefined ||
                board[subY + i * direction[1]][subX + i * direction[0]] === undefined ||
                board[subY + i * direction[1]][subX + i * direction[0]] === 0
              ) {
                break;
              } else if (board[subY + i * direction[1]][subX + i * direction[0]] === turnColor) {
                continue;
              } else if (
                board[subY + i * direction[1]][subX + i * direction[0]] ===
                3 - turnColor
              ) {
                board[subY][subX] = -1;
                break;
              }
            }
          }
        }
      }
    }
  },
};
