import React from "react";
import Board from "./Board";

import "../../assets/css/styles.css";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <div>
        <div>
          <Board/>
        </div>
        <div className="game-info">
        </div>
      </div>
    );
  }
}

export default Game;
