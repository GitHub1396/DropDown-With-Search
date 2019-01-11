import React from 'react';
import './GeneralMessage.css';
const GeneralMessage = ({ error, message }) => {
	let color;
	if (error) color = 'red';
	let image;
	if (error) {
		image = (
			<img
				className="message-image"
				src={require('../assets/image/connection-error.svg')}
				alt="network connection error"
			/>
		);
	}

	return (
		<div className="message-container" style={{ borderColor: color }}>
			<p className="message">{message}</p>
			{image}
		</div>
	);
};

export default GeneralMessage;
