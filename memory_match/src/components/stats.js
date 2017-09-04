import React from 'react';
import './stats.css';

const Stats = props => (
	<div className="stats">
		<div>Accuracy: {props.statsData.accuracy*100 + '%'}</div>
		<div>Attempts: {props.statsData.attempts/2}</div>
		<div>Games: {props.statsData.games}</div>
	</div>
)

export default Stats;