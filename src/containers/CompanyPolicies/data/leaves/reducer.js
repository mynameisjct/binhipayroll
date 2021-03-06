import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import  { CONSTANTS } from '../../../../constants';

const initialState = null;
const initialStatus = CONSTANTS.STATUS.LOADING;
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


const status = (state = initialStatus, action) => {
	switch (action.type) {
		case actionTypes.STATUS:
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
			console.log('activeLeaves: ' + action.payload);
			return action.payload;
			break;

		default:
			return state;
	}
};

export const reducer = combineReducers({
	data: data,
	status: status,
	activeRule: activeRule
});