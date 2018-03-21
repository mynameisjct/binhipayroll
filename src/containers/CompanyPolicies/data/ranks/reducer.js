import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import  { CONSTANTS } from '../../../../constants';

const initialState = null;
const initialStatus = CONSTANTS.STATUS.LOADING;
const initialActiveRule = null;

export const data = (state = initialState, action) => {
	let oState = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case actionTypes.UPDATE:
			return action.payload;
			break;
		
		case actionTypes.UPDATE_LEAVES:	
			oState.data.leaves = action.payload;
			return oState;
			break;

		case actionTypes.UPDATE_OVERTIME:	
			oState.data.overtime = action.payload;
			return oState;
			break;

		case actionTypes.UPDATE_UNDERTIME:	
			oState.data.undertime = action.payload;
			return oState;
			break;

		case actionTypes.UPDATE_TARDINESS:	
			oState.data.tardiness = action.payload;
			return oState;
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
			console.log('activeTardiness: ' + action.payload);
			return action.payload;
			break;

		default:
			return state;
	}
};

export const reducer = combineReducers({
	data: data,
	activeRule: activeRule,
	status: status
});
