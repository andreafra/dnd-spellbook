import React, { Component } from 'react';
import Deck from './Deck.js';
import Picker from './Picker.js';
import './App.css';
import allSpells from './spells.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.spells = allSpells;
    }

    render() {
        return (
            <div className="App">
                <Content spells={this.spells} page={0} />
            </div>
        );
    }
}

function Content (props) {
    if (props.page === 0)
        return <Picker spells={props.spells} />;
    else if (props.page === 1) {
        return <Deck spells={props.spells} />
    }
}


export default App;