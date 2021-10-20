import React from "react"
import Square from "./Square"

export default class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            order: 3
        }
    }

    renderSquare(i) {
        return (
            <Square
                key={i}
                highlight={this.props.winner && this.props.winner.includes(i)}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        )
    }

    renderBoardRow(j) {
        let element = []
        for (let i = 0; i < this.state.order; i++) {
            element.push(this.renderSquare(j + i))
        }
        return (
            <div
                className="board-row"
                key={j}
            >
                {element}
            </div>
        )
    }

    render() {
        let element = []
        for (let i = 0; i < this.state.order; i++) {
            element.push(this.renderBoardRow(i * this.state.order))
        }
        return <div> {element} </div>
    }
}
