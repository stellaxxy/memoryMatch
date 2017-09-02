import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/card.js' 

const backImage = 'https://hearthstone.gamepedia.com/media/hearthstone.gamepedia.com/thumb/8/89/Card_back-Lunar_New_Year.png/200px-Card_back-Lunar_New_Year.png?version=92a4eb69f432da2301e7271b42d33710';
const images = [
  'https://i.pinimg.com/736x/92/9d/3d/929d3d9f76f406b5ac6020323d2d32dc--pretty-cats-beautiful-cats.jpg',
  'https://i.pinimg.com/736x/92/9d/3d/929d3d9f76f406b5ac6020323d2d32dc--pretty-cats-beautiful-cats.jpg',
  'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
  'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
  'http://vb.jro7i.net/img/girls-top.net_1356132670_784.jpg',
  'http://vb.jro7i.net/img/girls-top.net_1356132670_784.jpg'
];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      backImage: backImage,
      imageList : images,
      cardsList : [],
      clickedCards: [],
      cards: 18,
      matchedCards: 0,
      cardRevealedStates: this.arrayFill(images.length, false)
    }

    this.handleClick = this.handleClick.bind(this);

  }
  arrayFill(count, value){
    var array = [];
    for(var i=0; i<count; i++){
      array[i] = value;
    } 
    return array;
  }
  componentDidMount(){
    this.setState({cardsList: this.createCards(this.state.imageList)});
  }
  handleClick(card){
    console.log('child card clicked',card);
    this.setState({clickedCards:this.state.clickedCards.concat(card)});
  }
  componentDidUpdate(prevProps, prevState){
    //debugger;
    console.log('updated');
    if(this.state.clickedCards.length===2){
      if(this.state.clickedCards[0].getIdentifier().backgroundImage === this.state.clickedCards[1].getIdentifier().backgroundImage){
        this.setState({
          clickedCards: []
        })
        //check if all cards are clicked
      } else {

        var revealedStates = this.state.cardRevealedStates.slice();
        revealedStates.map(item=>false);
        console.log('revealedStates',revealedStates);
        this.setState({
          clickedCards: [],
          cardRevealedStates: revealedStates
        });
        console.log('returning to hidden');
      }
    }
  }
  createCards(){
    console.log('create cards');
    const cardArray = [];
    for(let i=0; i<this.state.imageList.length; i++){
      let cardComponent = <Card key={i} revealed={this.state.cardRevealedStates[i]} clickCallback={this.handleClick} frontImage={this.state.imageList[i]} backImage={this.state.backImage} />
      cardArray.push(cardComponent);
      
    }
    //this.setState({cardRevealedStates : cardRevealedStates});
    console.log("test: ",cardArray);
    return cardArray;

  }
  render() {
    return (
      <div className="App">
        <div className="gameContainer">
          {this.state.cardsList}  
        </div>
      </div>
    );
  }
}

export default App;
