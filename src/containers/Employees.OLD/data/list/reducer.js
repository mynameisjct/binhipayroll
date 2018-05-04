import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import {CONSTANTS} from '../../../../constants';

const initialState = {data: []}
const initialStatusState =CONSTANTS.STATUS.LOADING;

export const data = (state = initialState, action) => {
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

export const status = (state = initialStatusState, action) => {
	switch (action.type) {
		case actionTypes.STATUS:
			console.log('STATUS: ' + action.payload);
			return action.payload;
			break;

		default:
			return state;
	}
}

export const list = combineReducers({
	data,
    status
}); 
