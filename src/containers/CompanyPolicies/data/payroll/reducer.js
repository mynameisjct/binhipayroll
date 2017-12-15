import * as actionTypes from './actionTypes';

const initialState = {
	companyworkshift: null,
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return action.companyworkshift;
			break;

		case actionTypes.EMPTY:
			return {};
			break;

		default:
			return state;
	}
};
