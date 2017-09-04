import React, { Component } from 'react';
import './modal.css';

class Modal extends Component{
	constructor(props){
		super(props);
		this.state = {
			display: props.display
		}
		this.close = this.close.bind(this);
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.display!==this.props.display){
			this.setState({
				display: nextProps.display,
				message: nextProps.message
			});
		}
	}
	close(){
		this.setState({
			display: false,
		});	
	}
	render(){
		return (
			<div className="modal" style={{display: this.state.display ? 'inline-block' : 'none'}}>
				<div className="modalShadow" />
				<div className="modalBody">
					<div className="modalClose" onClick={this.close}>X</div>
					<div className="modalContent">{this.state.message}</div>
				</div>
			</div>	
		)	
	}
}
export default Modal;