import React, { Component } from 'react';
import './InputSelect.css';
import InputSelect from './InputSelect';
import axios from 'axios';

class InputSelectContainer extends Component {
	state = {
		dropDownIsShown: false,
		itemsContainerHeight: 0,
		listOfItems: [],
	};
	componentDidMount() {
		axios.get('https://randomuser.me/api/?results=5').then(res => {
			this.setState({ listOfItems: res.data.results });
		});

		const itemsContainerHeight = document.getElementById('drpItemsContainer');
		this.setState({ itemsContainerHeight });
	}

	onSelectSearchHandler = e => {
		console.log(e);
	};
	onSelectIconClickedHandler = () => {
		const dropDownIsShown = this.state.dropDownIsShown;
		this.setState({ dropDownIsShown: !dropDownIsShown });
	};
	render() {
		const { dropDownIsShown, itemsContainerHeight, listOfItems } = this.state;
		return (
			<div className="input-select-container">
				<InputSelect
					searchable
					onSelectSearch={this.onSelectSearchHandler}
					dropDownIsShown={dropDownIsShown}
					onSelectIconClicked={this.onSelectIconClickedHandler}
					itemsContainerHeight={dropDownIsShown ? itemsContainerHeight : 0}
					listOfItems={listOfItems}
				/>
			</div>
		);
	}
}

export default InputSelectContainer;
