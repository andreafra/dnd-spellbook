import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Picker extends Component {
    constructor(props) {
        super(props);
        this.spells = props.spells;
        this.state = {
            query: "",
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
    updateQuery = (e) => {
        this.setState({query: e});
    }

    render() {
        const listItems = this.spells.map((spell, index) => (
            <Spell 
                spellData={spell}
                key={index} 
                spellId={index} 
                callbackFromSpell={this.getSpellData}
                search={this.state.search}
            />
        ));

        return(
            <div className="Anim-fade-in">
                <nav className="Navbar">
                    <Link className="Btn" to="/">Back</Link>
                    <div className="Spacer"></div>
                    <Link to="/deck"
                        className="Btn" 
                        onClick={this.sendSpellList}>
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
        this.updateQueryCallback = props.callbackFromSearchBox;
    }
    updateQuery = (e) => {
        this.updateQueryCallback(e.target.value)
    }
    render() {
        return (
            <input type="text" value={this.state.inputValue} onChange={e => this.updateInputValue(e)} />
        )
    }
}

class Spell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
            query: props.search.toLowerCase()
        };
        this.spellId = props.spellId;
        this.spellData = props.spellData;
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
        // if query is matched, render
        if(this.state.query === ""
        /* || this.spellData.title.toLowerCase() === this.query*/) {
            console.log(this.state.query);
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
            )
        } else {
            return null;
        }
    }
}

export default Picker;