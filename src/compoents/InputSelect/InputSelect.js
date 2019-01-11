import React from 'react';
import './InputSelect.css';

const InputSelect = ({ searchable, onSelectSearch, dropDownIsShown, onSelectIconClicked, listOfItems }) => {
	const detailInformation = {};
	console.log(listOfItems);
	detailInformation.age = listOfItems.map(item => {
		return item.dob.age;
	});
	console.log(detailInformation);
	const selectData = listOfItems.map(item => {
		return (
			<li key={item.value} className="select-item">
				<a href="/" className="select-item-link">
					<span className="select-item-image-container">
						<img
							src={item.picture.thumbnail}
							alt={item.name.first + ' ' + this.name.last}
							className="select-item-image"
						/>
					</span>
					<span className="select-item-description-container">
						<ul className="select-details" />
					</span>

					{item.title}
				</a>
			</li>
		);
	});
	const searchInput = (
		<div className="select-input-container">
			<div className="select-input-left-side">
				<input type="text" className="select-input-text" onChange={e => onSelectSearch(e.target.value)} />
			</div>
			<div className="select-input-right-side" onClick={onSelectIconClicked}>
				<i
					className={
						dropDownIsShown ? 'fa fa-chevron-down select-icon-down' : 'fa fa-chevron-down select-icon-up'
					}
				/>
			</div>
		</div>
	);
	return (
		<div>
			{searchable ? searchInput : null}
			<ul
				id="drpItemsContainer"
				className={dropDownIsShown ? 'select-items slide-down' : 'select-items slide-up'}
			>
				{selectData}
			</ul>
		</div>
	);
};

export default InputSelect;
