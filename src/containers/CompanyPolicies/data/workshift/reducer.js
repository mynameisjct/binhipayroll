import * as actionTypes from './actionTypes';

const initialState = {
	workshift: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return action.workshift;
			break;

		case actionTypes.EMPTY:
			return {};
			break;

		default:
			return state;
	}
};
