import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Picker extends Component {
    constructor(props) {
        super(props);
        this.spells = props.spells;
        this.state = {
            search: ""
        };
        this.selectedSpells = [];
    }

    // Retrieve infos from cards
    getSpellData = (data, checked) => {
        if(!checked) {
            // Add spell to list
            this.selectedSpells.push(data);
        } else {
            const sl = this.selectedSpells;
            if(sl.length > 0) {
                for(let i = sl.length-1; i >= 0; i--) {
                    if(sl[i][0] === data[0]) {
                        this.selectedSpells.splice(i, 1)
                        break;
                    }
                }
            }
        }
    }

    // Send data to parent (App)
    sendSelectedSpells = () => {
        this.props.callbackFromPicker(this.selectedSpells);
    }

    // Search spell
    updateQuery = (query) => {
        this.setState({search: query});
    }

    render() {
        const listItems = this.spells.map((spell, index) => (
            <Spell 
                spellData={spell}
                key={index} 
                spellId={index} 
                search={this.state.query}
                callbackFromSpell={this.getSpellData}
            />
        ));

        return(
            <div className="Anim-fade-in">
                <nav className="Navbar">
                    <Link className="Btn" to="/">Back</Link>
                    <div className="Spacer"></div>
                    <Link to="/deck"
                        className="Btn" 
                        onClick={this.sendSelectedSpells}>
                        Create Deck
                    </Link>
                </nav>
                <SearchBox callbackFromSearchBox={this.updateQuery} />
                <ul className="Picker-list">
                    {listItems}
                </ul>
            </div>
        );
    }
}

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        }
        this.updateQuery = props.callbackFromSearchBox;
    }
    updateInputValue = (e) => {
        this.setState({inputValue: e.target.value});
        this.updateQuery(e.target.value);
    }
    render() {
        return (
            <input type="text" onChange={this.updateQuery} />
        )
    }
}

class Spell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        };
        this.spellId = props.spellId;
        this.spellData = props.spellData;
        this.search = props.search;
    }

    toggleSpell = () => { 
        // Send data to parent via callback
        this.setState({isChecked: !this.state.isChecked},
            this.props.callbackFromSpell(
                [ this.spellId, this.spellData ],
                this.state.isChecked
            )
        );

    }

    render() {
        // IF QUALCOSA SEARCH = RETURN LI ELSE NULL
        return(
            <li className="Spell">
                <input
                    className="Spell-checkbox"
                    id={this.spellId}
                    type="checkbox" 
                    onChange={this.toggleSpell} 
                    checked={this.state.isChecked}/>
                <label className="Spell-title" htmlFor={this.spellId}>{this.spellData.title}</label>
            </li>
        );
    }
}

export default Picker;