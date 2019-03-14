import React, { Component } from 'react';
import '../styles/App.css';
import TitTacToe from "./TitTacToe";

class App extends Component {
    render() {
        return (
            <div className="App">
                <TitTacToe/>
            </div>
        );
    }
}

export default App;
