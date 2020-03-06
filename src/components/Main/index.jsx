import React, { Component } from "react";
import Game from './Game';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

        render() {
            return (
                <div>
                    <Game/>
                </div>
            )
        }
    }

export default Main;