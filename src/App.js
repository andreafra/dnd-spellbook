import React, { Component } from 'react';
import './App.css';
import spells from './spells.json';

var currentCardId = 0;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Deck /> 
      </div>
    );
  }
}

class Deck extends Component {
  constructor(props) {
    super(props);
    this.cards = spells;
  }
  render() {

    const listItems = this.cards.map((card, index) => (
      <Card cardData={card} key={index} cardId={index}/>
    ))

    return (
      <ul className="Deck-list">{listItems}</ul>
    )
  }
}

function Card(props) {
  const data = props.cardData;
  const id = props.cardId;

  if (id === currentCardId || id === currentCardId-1 || id === currentCardId+1) {
  return (
      <li className="Card">
        <h3 className="Card-title">{data.title}</h3>
        <div className="Card-subtitle">{data.contents[0]}</div>
        <div className="Card-details">
          <div className="Card-castingTime">{data.contents[2]}</div>
          <div className="Card-range">{data.contents[3]}</div>
          <div className="Card-duration">{data.contents[4]}</div>
          <div className="Card-components">{data.contents[5]}</div>
        </div>
        <div className="Card-description">
          <CardText cardText={data.contents[7]} />
          <CardText cardText={data.contents[8]} />
          <CardText cardText={data.contents[9]} />
          <CardText cardText={data.contents[10]} />
        </div>
      </li>
    )
  } else {
    return null;
  }
}

function CardText(props) {
  const text = props.cardText;
  if(text === "fill" || text === "" || text === undefined) {
    return null;
  } else {
    return <div className="Card-text">{text}</div>;
  }
}
export default App;