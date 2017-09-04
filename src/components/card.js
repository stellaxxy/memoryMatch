import React, { Component } from 'react';

class Card extends Component {
  constructor(props){
  	super(props);
  	this.state = {
  		revealed: this.props.revealed,
  		styles: this.styles
  	}
  	this.clickHandler = this.clickHandler.bind(this);
  }
  getIdentifier(){
  	return this.props.frontImage;
  }
  clickHandler(){
  	this.props.clickCallback(this);
  }
  render() {
    return (
    	<div className="card">
    		<div className="front" style={{backgroundImage: `url(${this.props.frontImage})`}}></div>
    		<div className="back" style={{backgroundImage: `url(${this.props.backImage})`,
    		display: this.props.hidden ? 'block' : 'none'}} onClick={this.clickHandler}></div>
    	</div>
    );
  }
}

export default Card;
