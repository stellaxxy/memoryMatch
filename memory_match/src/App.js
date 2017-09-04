import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Card from './components/card.js'
import Stats from './components/stats.js' 
import Modal from './components/modal.js'

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
      cardsRemaining: images.length,
      canClickCards: true,
      hideDelay: 3000,
      message: 'test',
      modalShow: false,
      statsData: {
        attempts: 0,
        games: 0,
        accuracy: 0
      },
      cardHiddenStates: this.arrayFill(images.length, true)
    }

    this.handleClick = this.handleClick.bind(this);
    this.resetGame = this.resetGame.bind(this);

  }
  randomizeCards(){
    debugger;
    const tempArray = this.state.imageList.slice();
    const destArray = [];
    while(tempArray.length){
      destArray.push(tempArray.splice((Math.random()*tempArray.length)>>0,1)[0]);
    }
    return destArray;
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
    if(this.state.canClickCards && this.state.clickedCards.length!==2){
      this.state.cardHiddenStates[card.props.cardIndex] = false;
      this.setState({
        clickedCards:this.state.clickedCards.concat(card),
        cardRevealedStates : this.state.cardRevealedStates
      });
    }
    
  }
  resetGame(){
    const cards = this.randomizeCards();
    this.setState({
      imageList:cards ,
      clickedCards: [],
      canClickCards: true, 
      modalShow: false,
      statsData: {
        attempts: 0,
        games: this.state.statsData.games+1,
        accuracy: 0,
      },
      cardHiddenStates: this.state.cardHiddenStates.map(()=>true),
      cardsRemaining: this.state.cardHiddenStates.length
    });
  }
  calculateAccuracy(attempts, remainingAdjustment=0){
    //console.log('stats: '+`attempts: ${attempts} totalCards: ${this.state.cardsList.length} remaining: ${this.state.cardsRemaining}`);
    let correct = this.state.cardsList.length - this.state.cardsRemaining-remainingAdjustment;
    return !correct ? 0 : (correct / attempts).toFixed(4);
  }
  componentDidUpdate(prevProps, prevState){
    //debugger;

    if(this.state.clickedCards.length===2){
      let {accuracy, games, attempts} = this.state.statsData;
      attempts += 2;
      if(this.state.clickedCards[0].getIdentifier() === this.state.clickedCards[1].getIdentifier()){

        var index1 = this.state.clickedCards[0].props.cardIndex;
        var index2 = this.state.clickedCards[1].props.cardIndex;
        this.state.cardHiddenStates[index1] = null;
        this.state.cardHiddenStates[index2] = null;

        accuracy = this.calculateAccuracy(attempts, -2);
        const newState = {
          cardsRemaining: this.state.cardsRemaining-2,
          clickedCards: [],
          statsData: {accuracy, games, attempts},
          cardHiddenStates: this.state.cardHiddenStates
        }
        
        if((this.state.cardsRemaining-2)===0){
          newState.modalShow = true;
          newState.message = "you win!"
        }
        this.setState(newState);
        //check if all cards are clicked
      } else {
        accuracy = this.calculateAccuracy(attempts);
        var hiddenStates = this.state.cardHiddenStates.map(item=>item===null ? false : true);
        this.setState({
          clickedCards: [],
          canClickCards: false,
          statsData: {accuracy, games, attempts}
        });
        setTimeout(this.delayedSwitchBack.bind(this,hiddenStates),this.state.hideDelay);
      }
    }
  }
  delayedSwitchBack(newHiddenStates){
    this.setState({
      cardHiddenStates:newHiddenStates,
      canClickCards: true
    });
  }
  createCards(){
    const cardArray = [];
    for(let i=0; i<this.state.imageList.length; i++){
      let cardComponent = <Card cardIndex={i} key={i} hidden={this.state.cardHiddenStates[i]} clickCallback={this.handleClick} frontImage={this.state.imageList[i]} backImage={this.state.backImage} />
      cardArray.push(cardComponent);
    }
    return cardArray;

  }
  render() {
    return (
      <div className="App">
        <header className="gameHeader">
          <button className="resetGame" onClick={this.resetGame}>RESET</button>
        </header>
        <Stats statsData={this.state.statsData} />
        <div className="gameContainer">
          {this.createCards()} 
        </div>
        <Modal message={this.state.message} display={this.state.modalShow}/>
      </div>
    );
  }
}

export default App;
