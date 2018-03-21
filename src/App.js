import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

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
            page: "picker",
        }
    }

    // Get data from Picker.js
    getSpellList = (data) => {
        this.spellList = data;
    }

    back = () => {

    }

    render() {
        return(
            <div className="App">
                <nav className="Navbar">
                    <Link className="Btn" to="/picker">Pick Spells</Link>
                </nav>
                <div>
                    <Route path="/picker" render={() => (
                        <Picker spells={this.spells} callbackFromPicker={this.getSpellList} />
                    )} />
                    <Route path="/deck" render={() => (
                        <Deck spells={this.spellList} />
                    )} />
                </div>
            </div>
        )
    }
}

export default App;