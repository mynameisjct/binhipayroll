import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';

const initialState = null;
const initialActiveRule = '';

const data = (state = initialState, action) => {
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

const activeRule = (state = initialActiveRule, action) => {
	switch (action.type) {
		case actionTypes.ACTIVERULE:
			console.log('activeTardiness: ' + action.payload);
			return action.payload;
			break;

		default:
			return state;
	}
};

export const reducer = combineReducers({
	data: data,
	activeRule: activeRule
});

