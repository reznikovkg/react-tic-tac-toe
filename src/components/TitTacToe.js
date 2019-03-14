import React, { Component } from 'react';
import '../styles/TitTacToe.css';

class TitTacToe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerSide: 'x',
            sizeFiled: 3,
            matrix: [],
            playerStep: 1,
            isStart: false
        };

        this.clickPlayer = this.clickPlayer.bind(this);
        this.checkWin = this.checkWin.bind(this);
    }

    setMatrix = () =>{
        let matrix = [];

        for (let i = 0; i < this.state.sizeFiled; i++) {
            matrix.push([]);
            for (let j = 0; j < this.state.sizeFiled; j++) {
                matrix[i].push(null);
            }
        }

        this.setState({matrix: matrix, isStart: true});
    };

    handleChangePlayerSide = (e) => {
        if (!this.state.isStart) {
            this.setState({playerSide: e.target.value});
        }
    };

    handleChangeSizeField = (e) => {
        if (!this.state.isStart) {
            this.setState({sizeFiled: e.target.value});
        }
    };

    start = () => {
        this.setMatrix();
    };

    resetting = () => {
        this.setState({
            playerSide: 'x',
            sizeFiled: 3,
            matrix: [],
            playerStep: 1,
            isStart: false
        });
    };

    autoStep = () => {
        let arr = [];
        for (let i = 0; i < this.state.matrix.length; i++) {
            for (let j = 0; j < this.state.matrix.length; j++) {
                if (!this.state.matrix[i][j]) {
                    arr.push({i:i,j:j});
                }
            }
        }
        let t = this.randomInteger(0,arr.length-1);
        this.clickPlayer(arr[t].i,arr[t].j);
    };

    randomInteger = (min, max) => {
        var rand = min + Math.random() * (max - min);

        rand = Math.round(rand);
        return rand;
    };

    playerStepShow = () => {
        if (!this.state.isStart) {
            return <div>Начните игру</div>
        }

        if (!this.containEmpty()) {
            return <div>Ничья! Пустых клеток нет</div>
        }

        if (this.checkWin()) {
            return <div>Победа игрока { (this.state.playerStep === 1 ? 2 : 1) }</div>
        }

        return <div>Ходит игрок {this.state.playerStep} ({this.state.playerSide}) <button onClick={this.autoStep}>Подсказка</button></div>
    };

    clickPlayer(i,j)  {
        if (this.checkWin() && this.containEmpty()) {
            return null;
        }

        let mat = this.state.matrix;

        if (mat[i][j] == null) {
            mat[i][j] = this.state.playerSide;

            if (this.state.playerSide === 'x') {
                this.setState({playerSide: 'o', playerStep: (this.state.playerStep === 1 ? 2 : 1) });
            } else {
                this.setState({playerSide: 'x', playerStep: (this.state.playerStep === 1 ? 2 : 1) });
            }
        }

        this.setState({matrix: mat});
    };

    checkWin() {
        for (let i = 0; i < this.state.matrix.length; i++) {
            let point = this.state.matrix[i][i];

            if (point !== null) {
                let num = 0;
                for (let j = 0; j < this.state.matrix.length; j++) {
                    if (point === this.state.matrix[i][j]) {
                        num++;
                    }
                }
                if (num === this.state.matrix.length) {
                    return true;
                }

                num = 0;
                for (let j = 0; j < this.state.matrix.length; j++) {
                    if (point === this.state.matrix[j][i]) {
                        num++;
                    }
                }
                if (num === this.state.matrix.length) {
                    return true;
                }
            }
        }






        let point = this.state.matrix[0][this.state.matrix.length-1];
        let num = 1;

        if (point !== null) {
            for (let j = 1; j < this.state.matrix.length; j++) {
                if (point === this.state.matrix[j][this.state.matrix.length-1-j]) {
                    num++;
                }
            }
            if (num === this.state.matrix.length) {
                return true;
            }
        }

        point = this.state.matrix[0][0];
        num = 1;

        if (point !== null) {
            for (let j = 1; j < this.state.matrix.length; j++) {
                if (point === this.state.matrix[j][j]) {
                    num++;
                }
            }
            if (num === this.state.matrix.length) {
                return true;
            }
        }

        return false;
    }

    containEmpty = () => {
        for (let i = 0; i < this.state.matrix.length; i++) {
            for (let j = 0; j < this.state.matrix.length; j++) {
                if (!this.state.matrix[i][j]) {
                    return true;
                }
            }
        }
        return false;
    };

    render() {
        return (
            <div className="TitTacToe">
                <nav>
                    Игрок 1:
                    <select value={this.state.playerSide}
                            onChange={this.handleChangePlayerSide}>
                        <option value="x">X</option>
                        <option value="o">O</option>
                    </select>
                    Размер:
                    <select value={this.state.sizeFiled}
                            onChange={this.handleChangeSizeField}>
                        {[3, 4, 5, 6, 7].map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <button onClick={this.start}>Начать игру за {this.state.playerSide} в {this.state.sizeFiled}x{this.state.sizeFiled}</button>
                    <button onClick={this.resetting}>Сбросить</button>
                </nav>
                <div className='table'>
                    {this.state.matrix.map((i,indexI) =>
                            <div className="row" key={indexI}>
                                {i.map((j,indexJ) =>
                                    <Square value={j} key={indexJ} indexI={indexI} indexJ={indexJ} clicki={this.clickPlayer}/>
                                )}
                            </div>
                        )}
                </div>
                <div>
                    {this.playerStepShow()}
                </div>
            </div>
        );
    }
}

class Square extends Component {
    con = () => {
        this.props.clicki(this.props.indexI,this.props.indexJ);
    };

    render() {
        return (
            <div className="square" onClick={this.con}>
                <div className="square-text">
                    {this.props.value}
                </div>
            </div>
        );
    }
}

export default TitTacToe;
