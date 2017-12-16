import * as actionTypes from './actionTypes';

const initialState = {
	tax: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return action.tax;
			break;

		case actionTypes.EMPTY:
			return {};
			break;

		default:
			return state;
	}
};
