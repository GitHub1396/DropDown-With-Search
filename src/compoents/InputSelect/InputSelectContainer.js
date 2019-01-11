import React, { Component } from 'react';
import './InputSelect.css';
import InputSelect from './InputSelect';
import axios from 'axios';
import Spinner from './Spinner/Spinner';
import GeneralMessage from './GeneralMessage/GeneralMessage';

class InputSelectContainer extends Component {
	state = {
		dropDownIsShown: false,
		itemsContainerHeight: 0,
		listOfItems: [],
		loading: false,
		generalMessage: '',
	};
	componentDidMount() {
		this.setState({ loading: true });
		axios
			.get('https://randomuser.me/api/?results=10')

			.then(res => {
				this.setState({
					loading: false,
					listOfItems: res.data.results,
				});
			})
			.catch(err => {
				this.setState({ loading: false });
				switch (err.message) {
					case 'Network Error':
						this.setState({
							generalMessage:
								'متاسفانه ارتباط شما با اینترنت قطع می باشد. لطفاً اتصال خود را به اینترنت کنترل نمایید.',
						});

						break;

					default:
						break;
				}
			});
	}

	componentDidUpdate(prevProps, prevState) {
		let itemsContainerHeight;
		if (this.state.generalMessage) {
			itemsContainerHeight = 0;
		} else {
			const itemsContainer = document.getElementById('drpItemsContainer');
			itemsContainerHeight = itemsContainer && itemsContainer.scrollHeight;
		}

		if (prevState.itemsContainerHeight !== itemsContainerHeight) {
			this.setState({ itemsContainerHeight });
		}
	}

	onSelectSearchHandler = e => {
		console.log(e);
	};
	onSelectIconClickedHandler = () => {
		const dropDownIsShown = this.state.dropDownIsShown;
		this.setState({ dropDownIsShown: !dropDownIsShown });
	};
	render() {
		const { dropDownIsShown, itemsContainerHeight, listOfItems, loading, generalMessage } = this.state;
		return loading ? (
			<Spinner />
		) : generalMessage ? (
			<GeneralMessage message={generalMessage} error />
		) : (
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
