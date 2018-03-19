import React, { Component } from 'react';
import Deck from './Deck.js';
import Picker from './Picker.js';
import './App.css';
import allSpells from './spells.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.spells = allSpells;
        this.spellList = ["ciao"],
        this.state = {
            page: 0,
        }
    }

    // Get data from Picker.js
    getSpellList = (data) => {
        this.spellList = data;
        this.setState({page: 1});
    }

    render() {
        if( this.state.page === 0)
            return (
                <div className="App">
                    <Picker spells={this.spells} callbackFromPicker={this.getSpellList}/>;
                </div>
            );
        else if (this.state.page === 1)
            return (
                <div className="App">
                    <Deck spells={this.spellList} />;
                </div>
            )
    }
}

export default App;