import * as actionTypes from './actionTypes';

const initialState = {
	tardiness: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return action.tardiness;
			break;

		case actionTypes.EMPTY:
			return {};
			break;

		default:
			return state;
	}
};
