import React, { Component } from 'react';

class Card extends Component {
  constructor(props){
  	super(props);


  	this.styles = {
  		back:{
    		
    	},
  		front:{
  			backgroundImage: `url(${props.frontImage})`
  		}
  	}
  	this.state = {
  		revealed: this.props.revealed,
  		styles: this.styles
  	}
  	this.clickHandler = this.clickHandler.bind(this);
  }
  getIdentifier(){
  	console.log('get id called');
  	return this.styles.front;
  }
  
  clickHandler(){
  	console.log('clicked',this.state.revealed);
  	this.setState({revealed: !this.state.revealed});
  	this.props.clickCallback(this);
  }
  render() {
    return (
    	<div className="card">
    		<div className="front" style={this.styles.front}></div>
    		<div className="back" style={{backgroundImage: `url(${this.props.backImage})`,
    		display: this.state.revealed ? 'none' : 'block'}} onClick={this.clickHandler}></div>
    	</div>
    );
  }
}

export default Card;
