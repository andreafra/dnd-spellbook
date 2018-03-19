import React, { Component } from 'react';

class Picker extends Component {
    constructor(props) {
        super(props);
        this.spells = props.spells;
        this.pickedSpells = this.spells;
    }

    render() {

        const listItems = this.spells.map((spell, index) => (
            <Spell spellData={spell}
                key={index} 
                spellId={index} 
                />
            ))

        return(
            <ul className="Picker-list">
                {listItems}
            </ul>
        )
    }
}

function Spell (props) {

    return(
        <li className="Spell">
            <input id={props.id} type="checkbox" onChange={this.updateValue} checked={this.checked}/>
            <label htmlFor={props.id}>{props.spell.title}</label>
        </li>
    )
}

export default Picker;