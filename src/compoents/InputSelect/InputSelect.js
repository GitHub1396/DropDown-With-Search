import React from 'react';
import './InputSelect.css';

const InputSelect = ({
	searchable,
	onSelectSearch,
	dropDownIsShown,
	onSelectIconClicked,
	listOfItems,
	itemsContainerHeight,
}) => {
	const selectData = listOfItems.map(item => {
		return (
			<li key={item.id.value || 'sample' + item.email} className="select-item  clearfix">
				<a href="/" className="select-item-link  clearfix">
					<div className="select-item-image-container">
						<img
							src={item.picture.thumbnail}
							alt={item.name.first + ' ' + item.name.last}
							className="select-item-image"
						/>
					</div>
					<div className="select-item-description-container">
						<ul className="select-details clearfix">
							<li key={item.name.first} className="select-detail">
								{`نام نمونه: ${item.name.first} نام خانوادگی نمونه:${item.name.last} `}
							</li>
							<li key={item.dob.age} className="select-detail">{`سن: ${item.dob.age}`}</li>
							<li key={item.email} className="select-detail">{`پست الکترونیک نمونه: ${item.email}`}</li>
						</ul>
					</div>
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
				className={dropDownIsShown ? 'select-items slide-down ' : 'select-items slide-up '}
				style={{ maxHeight: dropDownIsShown ? itemsContainerHeight : 0 }}
			>
				{selectData}
			</ul>
		</div>
	);
};

export default InputSelect;
