import React, { Component } from 'react';
import Deck from './Deck.js';
import Picker from './Picker.js';
import './App.css';
import allSpells from './spells.json';

class App extends Component {
    constructor(props) {
        super(props);
        this.spells = allSpells;
        this.spellList = [];
        this.state = {
            page: 0
        }
    }

    // Get data from Picker.js
    getSpellList = (data) => {
        this.spellList = data;
        this.setState({page: 1});
    }

    render() {
        switch(this.state.page){
            case 0:
                return (
                    <div className="App">
                        <Picker spells={this.spells} callbackFromPicker={this.getSpellList}/>;
                    </div>
                );
            case 1:
                return (
                    <div className="App">
                        <Deck spells={this.spellList} />;
                    </div>
                );
            default: 
                return null;
        }
    }
}

export default App;