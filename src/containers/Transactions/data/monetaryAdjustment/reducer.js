import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import  { CONSTANTS } from '../../../../constants';

const initialState = null;
const initialStatus = CONSTANTS.STATUS.LOADING;

export const data = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return action.payload;
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
			
		default:
			return state;
	}
};

export const reducer = combineReducers({
	data: data,
	status: status
});