import React from "react";
import Square from "./Square";
import { connect } from "react-redux";

import calculateWinner from "./CalcWinner.jsx";
import "../../assets/css/styles.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // squares: Array(9).fill(null),
      // xIsNext: true
    };
    this.handleClick = this.handleClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
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
  //           let score = minimax(board, depth + 1, false);
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
  //           let score = minimax(board, depth + 1, true);
  //           board[i][j] = "";
  //           bestScore = min(score, bestScore);
  //         }
  //       }
  //     }
  //     return bestScore;
  //   }
  // }

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
