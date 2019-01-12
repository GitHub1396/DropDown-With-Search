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
		filteredItems: [],
		loading: false,
		generalMessage: '',
		searchedText: '',
	};

	// TODO: chevron direction is not changed while leaving input and clicking on it
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
		let filteredItems;
		if (this.state.searchedText !== prevState.searchedText) {
			const searchedText = this.state.searchedText;
			const fetchedItems = this.state.listOfItems;
			filteredItems = fetchedItems.filter(fetchedItem => fetchedItem.name.first.includes(searchedText));
			this.setState({
				filteredItems: filteredItems,
			});
		}

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
		const searchedText = e;
		if (e !== '') {
			this.setState({ dropDownIsShown: true });
		}
		this.setState({ searchedText });
	};
	onSelectIconClickedHandler = () => {
		const dropDownIsShown = this.state.dropDownIsShown;
		this.setState({ dropDownIsShown: !dropDownIsShown });
	};

	onInputClickedHandler = () => {
		const dropDownIsShown = this.state.dropDownIsShown;
		this.setState({ dropDownIsShown: !dropDownIsShown });
	};
	render() {
		const {
			dropDownIsShown,
			itemsContainerHeight,
			listOfItems,
			loading,
			generalMessage,
			filteredItems,
		} = this.state;
		return loading ? (
			<Spinner />
		) : generalMessage ? (
			<GeneralMessage message={generalMessage} error />
		) : (
			<div className="input-select-container">
				<InputSelect
					searchable
					onSelectSearch={this.onSelectSearchHandler}
					onSelectIconClicked={this.onSelectIconClickedHandler}
					onInputClicked={this.onInputClickedHandler}
					dropDownIsShown={dropDownIsShown}
					itemsContainerHeight={dropDownIsShown ? itemsContainerHeight : 0}
					listOfItems={listOfItems}
					filteredItems={filteredItems}
				/>
			</div>
		);
	}
}

export default InputSelectContainer;
