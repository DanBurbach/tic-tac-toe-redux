import React from "react";
import Square from "./Square";
import { connect } from "react-redux";

import calculateWinner from "./CalcWinner.jsx";
import "../../assets/css/styles.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // human: null,
      // computer: null,
      // playerLose: false,

    };
    this.handleClick = this.handleClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
    // this.minimax = this.minimax.bind(this);
    // this.bestMove = this.bestMove.bind(this);
  }

  // bestMove = () => {
  //     // AI to make its turn
  //     let bestScore = -Infinity;
  //     let move;
  //     for (let i = 0; i < 3; i++) {
  //         for (let j = 0; j < 3; j++) {
  //             // Is the spot available?
  //             if (board[i][j] == "") {
  //             board[i][j] = ai;
  //             let score = this.minimax(board, 0, false);
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

  // minimax(board, depth, isMaximizing) {
  //     let scores = {
  //       X: 10,
  //       O: -10,
  //       tie: 0
  //     };
  //   let result = calculateWinner(latestGame.squares);
  //   if (result !== null) {
  //     return scores[result];
  //   }

  //   if (isMaximizing) {
  //     let bestScore = -Infinity;
  //     for (let i = 0; i < 3; i++) {
  //       for (let j = 0; j < 3; j++) {
  //         // Is the spot available?
  //         if (board[i][j] == "") {
  //           board[i][j] = ai;
  //           let score = this.minimax(board, depth + 1, false);
  //           board[i][j] = "";
  //           bestScore = max(score, bestScore);
  //         }
  //       }
  //     }
  //     return bestScore;
  //   } else {
  //     let bestScore = Infinity;
  //     for (let i = 0; i < 3; i++) {
  //       for (let j = 0; j < 3; j++) {
  //         // Is the spot available?
  //         if (board[i][j] == "") {
  //           board[i][j] = human;
  //           let score = this.minimax(board, depth + 1, true);
  //           board[i][j] = "";
  //           bestScore = min(score, bestScore);
  //         }
  //       }
  //     }
  //     return bestScore;
  //   }
  // }

  // miniMax = (board, turn) => {
  //   const { human, computer } = this.state;
  //   const newBoard = [...board];
  //   const emptySquares = this.findEmptySquares(newBoard);
  //   const moves = [];

  //   if (this.checkWin(newBoard, human)) {
  //     return { score: -10 };
  //   } else if (this.checkWin(newBoard, computer)) {
  //     return { score: 10 };
  //   } else if (emptySquares.length === 0) {
  //     return { score: 0 };
  //   }

  //   for (let i = 0; i < emptySquares.length; i++) {
  //     const move = {};
  //     move.index = emptySquares[i];
  //     newBoard[emptySquares[i]] = turn;

  //     if (turn === computer) {
  //       const result = this.miniMax(newBoard, human);
  //       move.score = result.score;
  //     } else {
  //       const result = this.miniMax(newBoard, computer);
  //       move.score = result.score;
  //     }
  //     newBoard[emptySquares[i]] = move.index;
  //     moves.push(move);
  //   }

  //   let bestMove;
  //   if (turn === computer) {
  //     let bestScore = -10000;
  //     for (let i = 0; i < moves.length; i++) {
  //       if (moves[i].score > bestScore) {
  //         bestScore = moves[i].score;
  //         bestMove = i;
  //       }
  //     }
  //   } else {
  //     let bestScore = 10000;
  //     for (let i = 0; i < moves.length; i++) {
  //       if (moves[i].score < bestScore) {
  //         bestScore = moves[i].score;
  //         bestMove = i;
  //       }
  //     }
  //   }
  //   return moves[bestMove];
  // };

  handleClick(boxId) {
    const gameState = { ...this.props.gameState };
    const latestGame = { ...this.props.latestGame };

    const { dispatch } = this.props;

    if (calculateWinner(latestGame.squares) || latestGame.squares[boxId]) {
      return;
    }

    latestGame.squares[boxId] = gameState.xIsNext ? "X" : "O";
    gameState.xIsNext = !gameState.xIsNext;

    const action = {
      type: "PLAYER_MOVE",
      squares: latestGame.squares,
      xIsNext: gameState.xIsNext,
      history: gameState.history
    };
    dispatch(action);
  }

  resetGame = event => {
    event.preventDefault();
    window.location.reload();
  };

  renderSquare(i) {
    return (
      <Square
        value={this.props.latestGame.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.props.latestGame.squares);
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.props.gameState.xIsNext ? "X" : "O");
    }
    return (
      <div className="main-board">
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <div className="reset">
          <button className="resetButton" onClick={this.resetGame}>
            RESET
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    gameState: state,
    latestGame: state.history[state.history.length - 1]
  };
}

export default connect(mapStateToProps)(Board);
