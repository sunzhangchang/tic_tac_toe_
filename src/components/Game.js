import React from "react"
import Board from "./Board"

export default class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history_: [{
                squares: Array(9).fill(null),
                position: null
            }],
            stepNumber: 0,
            xIsNext: true,
            moveOrder: true
        }
    }

    handleClick(i) {
        const history_ = this.state.history_.slice(0, this.state.stepNumber + 1)
        const current = history_[history_.length - 1]
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history_: history_.concat([{
                squares: squares,
                position: i
            }]),
            stepNumber: history_.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    handleRestart() {
        this.setState({
            history_: [{
                squares: Array(9).fill(null),
                position: null
            }],
            stepNumber: 0,
            xIsNext: true,
            moveOrder: true
        })
    }

    toggleSort() {
        this.setState({
            moveOrder: !this.state.moveOrder
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history_ = this.state.history_.slice()
        const current = history_[this.state.stepNumber]
        const winner = calculateWinner(current.squares)
        const style = {'fontWeight': 'bold'}

        if (!this.state.moveOrder) {
            history_.reverse()
        }

        const moves = history_.map((step, move) => {
            const realMove = this.state.moveOrder ? move : history_.length - 1 - move
            const desc = realMove ?
                ' Go to move (' + parseInt(history_[move].position / 3) + ',' + history_[move].position % 3 + ')'
                : 'Go to game start'
            return (
                <li key={move}>
                    <button
                        style={realMove == this.state.stepNumber ? style : {}}
                        className={'historyButton'}
                        onClick={() => this.jumpTo(realMove)}
                    >
                        {desc}
                    </button>
                </li>
            )
        })

        let status
        if (winner === false && history_.length === 10 && this.state.stepNumber === 9) {
            status = "Draw"
        } else if (winner === null) {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
        } else {
            status = 'Winner: ' + current.squares[winner[0]]
        }

        return (
            <div className="game">
                <div className="game-info">
                    <div> {status} </div>
                    <div> Show in {this.state.moveOrder ? 'Asc' : 'Desc'} </div>
                    <button onClick={() => this.handleRestart()}> New  Game </button>
                    <button onClick={() => this.toggleSort()}> Toggle Sort </button>
                </div>
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winner={winner}
                    />
                </div>
                <div className="game-history">
                    <ol> {moves} </ol>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    let winpos = []
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winpos = winpos.concat(lines[i])
        }
    }
    if (winpos.length) {
        return winpos
    }
    for (let i = 0; i < 9; i++) {
        if (squares[i] === null) {
            return null
        }
    }
    return false
}
