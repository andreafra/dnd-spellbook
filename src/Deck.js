import React, { Component } from 'react';
import Swipe from 'react-easy-swipe';

class Deck extends Component {
    constructor(props) {
        super(props);
        this.cards = props.spells;
        this.state = {
            currentCardId: 0,
            deltaX: 0,
            isSwiping: false,
            isAnimating: false
        };
        this.minDeltaX = 20;
    }

    // componentDidMount() {
    //   const card = document.querySelector(".Card-active");
    // }

    onSwipeStart = (e) => {
        this.setState({isSwiping: true, isAnimating: false, deltaX: 0});
    }

    onSwipeMove = (pos, e) => {
        if(pos.x < -this.minDeltaX || pos.x > this.minDeltaX) {
            this.setState({deltaX: pos.x});
        }
    }

    onSwipeEnd = (e) => {
        if(this.state.deltaX > this.minDeltaX) {
            this.prevCard();
        } else if(this.state.deltaX < -this.minDeltaX) {
            this.nextCard();
        }
    }

    // Next and prev card buttons
    prevCard = () => {
        this.setState({
            currentCardId: (this.cards.length + this.state.currentCardId-1) % this.cards.length,
            isSwiping:false,
            deltaX: 0
        });
    }

    nextCard = () => {
        this.setState({
            currentCardId: (this.cards.length + this.state.currentCardId+1) % this.cards.length,
            isSwiping:false,
            deltaX: 0
        });
    }

    render() {
        const listItems = this.cards.map((card, index) => (
            <Card cardData={card}
                key={index} 
                cardId={index} 
                currentCardId={this.state.currentCardId}
                deltaX={this.state.deltaX}
                isSwiping={this.state.isSwiping} />
        ));

        return (
            <div>
                <nav className="Navbar">
                    <button 
                        className="Btn"
                        onClick={this.prevCard}>Back</button>
                    <button 
                        className="Btn" 
                        onClick={this.nextCard}>Next</button>
                </nav>
                <Swipe className="Deck-wrapper" 
                    onSwipeStart={this.onSwipeStart}
                    onSwipeMove={this.onSwipeMove}
                    onSwipeEnd={this.onSwipeEnd}
                    allowMouseEvents={true}>
                    <ul className="Deck-list">
                        {listItems}
                    </ul>
                </Swipe>
            </div>
        );
    }
}

function Card(props) {
    const data = props.cardData[1];
    const id = props.cardId;
    const ccid = props.currentCardId;
    const deltaX = props.deltaX;
    const isSwiping = props.isSwiping;

    const styles = {
        transformOrigin: "50% 100%"
    };
    var classes = "Card Card-fade-in";

    if(isSwiping) {
        classes = "Card";
    }

    if(isSwiping) {
        styles.transform = "translateX(" + deltaX + "px)" + 
        "rotateZ(" + deltaX/3.14 + "deg)";
        styles.opacity = 1 - Math.abs(deltaX/100);
    }

    if(id === ccid) {
        // Render Card
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
        );
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

export default Deck;