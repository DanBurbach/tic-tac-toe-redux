import calculateWinner from '../Main/CalcWinner';
import React, { Component } from "react";

class BestMove extends Component {
  constructor(board, depth, isMaximizing) {
    this.bestPlacement = null;
    this.minimax(board, depth, isMaximizing);
    return this.bestPlacement;
  }

// function bestMove() {
//     // AI to make its turn
//     let bestScore = -Infinity;
//     let move;
//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//             // Is the spot available?
//             if (board[i][j] == "") {
//             board[i][j] = ai;
//             let score = minimax(board, 0, false);
//             board[i][j] = "";
//             if (score > bestScore) {
//                 bestScore = score;
//                 move = { i, j };
//             }
//             }
//         }
//     }
//     board[move.i][move.j] = ai;
//     currentPlayer = human;
// }

minimax(board, depth, isMaximizing) {
    let scores = {
      X: 10,
      O: -10,
      tie: 0
    };
  let result = calculateWinner(latestGame.squares);
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}
}

export default BestMove;
