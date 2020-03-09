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
      xIsNext: true
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(boxId) {
    const gameState = {...this.props.gameState};
    const latestGame = {...this.props.latestGame};

    const { dispatch } = this.props;

    if (calculateWinner(latestGame.squares) || latestGame.squares[boxId]){
      return;
    }

    latestGame.squares[boxId] = (gameState.xIsNext ? 'X' : 'O');
    gameState.xIsNext = !gameState.xIsNext;

    const action = {
      type: 'PLAYER_MOVE',
      squares: latestGame.squares,
      xIsNext: gameState.xIsNext,
      history: gameState.history
    }
    dispatch(action);
  }

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
