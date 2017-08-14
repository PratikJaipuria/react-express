
import React, { Component } from 'react';


export class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_symbol: props.symbol,
            current_mode: props.mode,
            turn: "your move!",
            board: ["", "", "", "", "", "", "", "", ""],
            result: "no winner",
            winner: "no",
            winning_combo: []
        };
        this.default_state = this.state;
        this.winCombos = [
            // winnig combinations on board cells # 0-8
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        this.resetGame = this.resetGame.bind(this);
        this.checkWinner = this.checkWinner.bind(this);
        this.computerMove = this.computerMove.bind(this);
        //this.setTurn = this.setTurn.bind(this);
    }
    resetGame(event) {
        if (event.target.innerHTML == "start new") {
            ReactDOM.render(<ChooseMode />, document.getElementById("root"));
        } else {
            this.default_state.board = ["", "", "", "", "", "", "", "", ""];
            this.setState(this.default_state);
        }
    }
    checkWinner(name) {
        //find winning combo and return it:
        let wincombo = this.winCombos.find(elem => {
            return (
                this.state.board[elem[0]] !== "" &&
                this.state.board[elem[0]] == this.state.board[elem[1]] &&
                this.state.board[elem[1]] == this.state.board[elem[2]]
            );
        });
        //if win combo is found it is true and we use this:
        if (wincombo) {
            this.setState({
                // show board with highlighted winning combo
                result: "showresult",
                turn: "and here it is.....",
                winning_combo: wincombo
            });
            // check if actually starter won))
            if (this.default_state.current_symbol == name) {
                setTimeout(
                    () =>
                        this.setState({
                            result: "got winner",
                            winner: name,
                            turn: "Congrats!!!!"
                        }),
                    1000
                );
            } else {
                setTimeout(
                    () =>
                        this.setState({
                            result: "lost",
                            turn: "What a drama! You've lost... :("
                        }),
                    1000
                );
            }
        } else {
            //check if board is full and result is a draw
            let board_full = this.state.board.filter(cell => {
                return cell === "";
            });
            if (board_full.length === 0) {
                setTimeout(
                    this.setState({
                        result: "draw",
                        turn: "no winner this time"
                    }),
                    500
                );
            }
        }
    }
    switchMove() {
        // useful function returns object for this.setState
        return {
            board: this.state.board,
            current_symbol: this.state.current_symbol === "x" ? "o" : "x",
            turn: this.state.turn === "your move!"
                ? "opponent's move..."
                : "your move!"
        };
    }
    yourMove(index) {
        if (this.state.board[index] === "") {
            // check if cell is taken
            this.state.board[index] = this.state.current_symbol;
            this.setState(() => this.switchMove());
            this.checkWinner(this.state.board[index]);
            if (this.state.current_mode == "one player") {
                // computer moves if in 'one player mode'
                setTimeout(() => {
                    this.computerMove();
                }, 1000); //computer moves in a sec delay = kind of 'thinking' =)
            }
        } else {
            return false;
        }
    }
    computerMove() {
        //puts symbol in center if not taken
        if (this.state.board[4] === "") {
            this.state.board[4] = this.state.current_symbol;
            this.setState(() => this.switchMove());
        } else {
            //puts in a corner only if its just a 2nd move
            let taken_cells = this.state.board.filter((elem, index) => {
                return elem !== "";
            });
            if (taken_cells.length === 1) {
                let possible_corners = [0, 2, 6, 8]; // board indexes of corner cells
                this.state.board[
                    possible_corners[Math.floor(Math.random() * 4)]
                    ] = this.state.current_symbol;
                this.setState(() => this.switchMove());
            } else {
                //search for winning combos so automatically will not let you win or will win by himself
                let wincombo = this.winCombos.find(elem => {
                    let count = 0;
                    for (let i = 0; i < elem.length; i++) {
                        if (this.state.board[elem[i]] != "") {
                            count++;
                        }
                    }
                    if (count === 2) {
                        //if at least 2 elements exist in winnig combo then go
                        //check if at least 2 cells are EQUAL and return that wincombo otherwise it could be x and o in one row
                        return (
                            this.state.board[elem[0]] == this.state.board[elem[1]] ||
                            this.state.board[elem[0]] == this.state.board[elem[2]] ||
                            this.state.board[elem[1]] == this.state.board[elem[2]]
                        );
                    } else {
                        return false;
                    }
                });
                //if potential wincombo is found inserts there, otherwise randomly puts symbol
                if (wincombo) {
                    //find which index in wincombo is empty to put there
                    let index = wincombo.find(cell => {
                        return this.state.board[cell] == "";
                    });
                    this.state.board[index] = this.state.current_symbol;
                    this.setState(() => this.switchMove()); // insert his symbol into that winning combo as a result it will mess up your moves or suddenly make his winning combo real!
                    this.checkWinner(this.state.board[index]);
                } else {
                    //put in first empty cell
                    let empty_index = this.state.board.findIndex(cell => {
                        return cell == "";
                    });
                    this.state.board[empty_index] = this.state.current_symbol;
                    this.setState(() => this.switchMove());

                    //check if board is full and result is a draw
                    let board_full = this.state.board.filter(cell => {
                        return cell === "";
                    });
                    if (board_full.length === 0) {
                        setTimeout(
                            this.setState({
                                result: "draw",
                                turn: "no winner this time"
                            }),
                            500
                        );
                    } else {
                        this.checkWinner(this.state.board[index]);
                    }
                }
            }
        }
    }
    render() {
        let insert;
        if (this.state.result === "got winner") {
            insert = <h2>You won the game!</h2>;
        } else if (this.state.result === "draw") {
            insert = <h2>relax, it's a draw!</h2>;
        } else if (this.state.result === "lost") {
            insert = <h2>oh no! You've lost >:(</h2>;
        } else if (this.state.result === "showresult") {
            insert = this.state.board.map((cell, index) => {
                if (
                    index == this.state.winning_combo[0] ||
                    index == this.state.winning_combo[1] ||
                    index == this.state.winning_combo[2]
                ) {
                    return (
                        <div onClick={() => this.yourMove(index)} className="square win">
                            {cell}
                        </div> // add class 'win' to highlight winning combo
                    );
                } else {
                    return (
                        <div onClick={() => this.yourMove(index)} className="square">
                            {cell}
                        </div>
                    );
                }
            });
        } else {
            insert = this.state.board.map((cell, index) => {
                return (
                    <div onClick={() => this.yourMove(index)} className="square">
                        {cell}
                    </div>
                );
            });
        }
        return (
            <div className="game">
                <div className="whosTurn">{this.state.turn}</div>
                <div id="board" className="board">
                    {insert}
                </div>
                <div onClick={this.resetGame} className="whosTurn">
                    <span className="reset">reset game</span> or
                    {" "}<span className="reset">start new</span>
                </div>
            </div>
        );
    }
}
class ChooseMode extends Component {
    constructor(props) {
        super(props);
        this.state = {
            top_phrase: "Welcome to 'Tic Tac Toe' game!",
            choose_text: "Choose the mode first:",
            text_left: "one player",
            text_right: "two players",
            text_bottom: (
                <a target="_blank" href="https://codepen.io/andytee/">made by andy</a>
            ),
            mode: "no mode"
        };
        this.default_state = this.state;
        this.picked_symbol = "x"; //outside of state because we don't need to render again after choosing x or o
        this.pickMode = this.pickMode.bind(this);
        this.getBack = this.getBack.bind(this);
    }
    getBack() {
        this.setState(this.default_state);
    }
    pickMode(event) {
        if (this.state.mode !== "no mode") {
            //second click with choice of 'x' or 'o'
            this.picked_symbol = event.target.innerHTML;
            this.pickSymbol(this.state.mode, this.picked_symbol);
        } else {
            //first click with choice 'one player' or 'two player'
            this.setState({
                choose_text: "Choose 'x' or 'o' : ",
                text_left: "x",
                text_right: "o",
                text_bottom: "<--- get back",
                mode: event.target.innerHTML
            });
        }
    }
    pickSymbol(mode, symbol) {
        ReactDOM.render(
            <Game mode={mode} symbol={symbol} />,
            document.getElementById("root")
        );
    }
    render() {
        return (
            <div id="choose_mode" className="game">
                <div className="whosTurn">{this.state.top_phrase}</div>
                <div id="board" className="board">
                    <div className="choose">{this.state.choose_text}</div>
                    <div className="mode">
                        <div className="one" onClick={this.pickMode}>
                            {this.state.text_left}
                        </div>
                        <div className="two" onClick={this.pickMode}>
                            {this.state.text_right}
                        </div>
                    </div>
                </div>
                <div onClick={this.getBack} className="whosTurn bottom">
                    {this.state.text_bottom}
                </div>
            </div>
        );
    }
}
export default ChooseMode;
// ReactDOM.render(<ChooseMode />, document.querySelector("body"));
