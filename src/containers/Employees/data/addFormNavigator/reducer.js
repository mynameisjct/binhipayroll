import * as actionTypes from './actionTypes';

const initialState = {
	index: 0,
	key: null
};

export const reducer = (state = initialState, action) => {
	let oState = JSON.parse(JSON.stringify(state))
	switch (action.type) {
		case actionTypes.TRIGGERNEXT:
			oState.index = state.index + 1;
			oState.key = action.payload
			return oState;
			break;

		default:
			return state;
	}
}
