import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';

import Deck from './Deck.js';
import Picker from './Picker.js';
import './App.css';
import logo from './logo.svg';
import allSpells from './spells.json';

// For server version
const __PATH__ = (window.location.hostname === "andreafranchini.me") ? "/dnd-spell-cards-online" : "/";

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
                <Route exact path={__PATH__} component={Home} />
                <Route exact path={__PATH__ + "/picker"} render={() => (
                    <Picker spells={this.spells} callbackFromPicker={this.getSpellList} />
                )} />
                <Route exact path={__PATH__ + "/deck"} render={() => <Deck spells={this.spellList} />} />
            </div>
        )
    }
}

class Home extends Component {

    render() {

        return(
            <div className="Home-wrapper">
                <div className="Home-content">
                    {/* Content goes here*/}
                    <h1 className="Home-title">dnd-spell-cards-online</h1>
                    <img src={logo} alt="logo"/>
                    <nav className="Navbar Navbar-center">
                        <Link to={__PATH__ + "/picker"} className="Btn">Pick Spells</Link>
                        <Link to={__PATH__ + "/deck"} className="Btn">Go to Deck</Link>
                    </nav>
                </div>
            </div>
        )
    }
}

export default App;