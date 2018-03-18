import React, { Component } from 'react';
import Swipe from 'react-easy-swipe';
import './App.css';
import spells from './spells.json';

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
    this.state = {
      currentCardId: 0,
      cardSwipePadding: 0,
      cardSwipeDistance: 0,
      cardWidth: 0,
      cardX: 0,
      shouldUpdateCards: 0,
      shouldTransition: false
    };
    this.prevCard = this.prevCard.bind(this);
    this.nextCard = this.nextCard.bind(this);
    this.onSwipeStart = this.onSwipeStart.bind(this);
    this.onSwipeMove = this.onSwipeMove.bind(this);
    this.onSwipeEnd = this.onSwipeEnd.bind(this);

  }

  componentDidMount() {
    const card = document.querySelector(".Card-active");
    this.setState({
      cardWidth: card.clientWidth,
      cardX: card.getBoundingClientRect().left
    })
  }

  onSwipeStart(pos, e) {
    this.setState({shouldTransition: false})
  }
  onSwipeMove(pos, e) {
    const swipeDistance = 100;
    if(pos.x < -swipeDistance) {
      this.setState({shouldUpdateCards: 1});
    } else if(pos.x > swipeDistance) {
      this.setState({shouldUpdateCards: -1});
    } else {
      this.setState({shouldUpdateCards: 0})
    }
    this.setState({
      cardSwipePadding: pos.x,
      cardSwipeDistance: pos.x
    })
  }
  onSwipeEnd(pos, e) {
    this.setState({cardSwipePadding: 0})
    if(this.state.shouldUpdateCards === 1) {
      // Swiping to next card
      this.setState({shouldUpdateCards: 0, shouldTransition: false})
      this.nextCard();
    } else if(this.state.shouldUpdateCards === -1) {
      // Swiping to prev card
      this.setState({shouldUpdateCards: 0, shouldTransition: true})
      this.prevCard();
    } else {
      this.setState({shouldTransition: true})
    }
  }

  // Next and prev card buttons
  prevCard() {
    if (this.state.currentCardId > 0) {
      this.setState({currentCardId: this.state.currentCardId-1});
    }
  }
  nextCard() {
    if (this.state.currentCardId < this.cards.length) {
      this.setState({currentCardId: this.state.currentCardId+1});
    }
  }

  render() {
    const listItems = this.cards.map((card, index) => (
      <Card cardData={card}
        key={index} 
        cardId={index} 
        currentCardId={this.state.currentCardId}
        shouldUpdateCards={this.state.shouldUpdateCards}
        cardSwipePadding={this.state.cardSwipePadding}
        cardSwipeDistance={this.state.cardSwipeDistance}
        shouldTransition={this.state.shouldTransition}/>
    ))

    return (
      <Swipe className="Deck-wrapper" 
        onSwipeStart={this.onSwipeStart}
        onSwipeMove={this.onSwipeMove}
        onSwipeEnd={this.onSwipeEnd}
        allowMouseEvents={true}>
        <ul className="Deck-list">{listItems}</ul>
        <button onClick={this.prevCard}>Back</button>
        <button onClick={this.nextCard}>Next</button>
      </Swipe>
    )
  }
}

function Card(props) {
  const data = props.cardData;
  const id = props.cardId;
  const ccid = props.currentCardId;
  const padding = props.cardSwipePadding;
  const distance = props.cardSwipeDistance;
  const shouldTransition = props.shouldTransition;
  const shouldUpdateCards = props.shouldUpdateCards;
  var styles = {}
  var classes = "Card ";

  // How far the user should swipe before the cards starts moving
  const minSwipeDistance = 10

  // Animation if going to next card
  if(id === ccid && shouldUpdateCards >= 0 && distance < -minSwipeDistance) {
    styles = {};
    styles.transform = "translateX(" + padding + "px)" +
                       "rotateZ(" + padding/2 + "deg)";
    styles.transformOrigin = "0% 100%";
    
    if(shouldTransition) classes += "Card-transition ";
  }
  // Animation if going to prev card
  if(id === ccid-1 && shouldUpdateCards < 0 && distance > minSwipeDistance) {
    styles = {};
    styles.transform = "translateX(" + padding + "px)";
  }

  // Class customization
  if (id === ccid /*|| id === ccid-1*/ || id === ccid+1) {
    if(id === ccid) classes += "Card-active ";
    if(id === ccid+1) classes += "Card-next ";
    //if(id === ccid-1) classes += "Card-prev ";

    return (
      <li className={classes} style={styles}>
        <h3 className="Card-title">{data.title}</h3>
        <div className="Card-subtitle">{data.contents[0]}</div>
        <div className="Card-details">
          <CardDetail cardText={data.contents[2]} className="Card-detail Card-castingTime" />
          <CardDetail cardText={data.contents[3]} className="Card-detail Card-range" />
          <CardDetail cardText={data.contents[4]} className="Card-detail Card-dudistancen" />
          <CardDetail cardText={data.contents[5]} className="Card-detail Card-components" />
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

function CardDetail(props) {
  const text = props.cardText.split(" | ");
  const title = text[0];
  const value = text[1];
  return (
    <div className={props.className}>
      {title}
      <span>
        {value}
      </span>
    </div>
  );
}

export default App;