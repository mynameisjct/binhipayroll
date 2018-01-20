import * as actionTypes from './actionTypes';

const initialState = null;
const initialStatusState=2;

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return action.payload;
			break;

		case actionTypes.EMPTY:
			return {};
			break;

		default:
			return state;
	}
};

export const statusReducer = (state = initialStatusState, action) => {
	switch (action.type) {
		case actionTypes.STATUS:
			return action.payload;
			break;

		case actionTypes.EMPTY:
			return ;
			break;

		default:
			return state;
	}
}
