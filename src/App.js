import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Deck from './Deck.js';
import Picker from './Picker.js';
import Copyright from './Copyright.js';
import './App.css';
import logo from './logo.svg';
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

    render() {
        return(
            <div className="App">
                <Route exact path="/" component={Home} />
                <Route exact path="/picker" render={() => (
                    <Picker spells={this.spells} callbackFromPicker={this.getSpellList} />
                )} />
                <Route exact path="/deck" render={() => <Deck spells={this.spellList} />} />
            </div>
        )
    }
}

class Home extends Component {

    render() {

        return(
            <div>
                <div className="Home-wrapper">
                    <div className="Home-content">
                        {/* Content goes here*/}
                        <h1 className="Home-title">DnD Spell Cards</h1>
                        <img src={logo} alt="logo"/>
                        <nav className="Navbar Navbar-center">
                            <Link to="picker" className="Btn">Pick Spells</Link>
                            <Link to="deck" className="Btn">Go to Deck</Link>
                        </nav>
                    </div>
                </div>
                <Copyright />
            </div>
        )
    }
}

export default App;