import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const initialState = {
	basicinfo: {},
	contactinfo: {},
	ids: {}
};
const initialStatus = 2;

export const employee = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_ALLINFO:
			return {
				employee: {...state.employeeProfile}
			}
			break;
		
		case actionTypes.UPDATE_BASICINFO:
			console.log('actionVal: ' + JSON.stringify(action));
			return {
				...state.basicinfo,
				...action.payload
			}
			break;

		case actionTypes.UPDATE_ADDRESS:
			return {
				employee: {...state.employeeProfile}
			}
			break;
		
		case actionTypes.UPDATE_DEPENDENTS:
			return {
				employee: {...state.employeeProfile}
			}
			break;
		
		case actionTypes.UPDATE_BACKGROUND:
			return {
				employee: {...state.employeeProfile}
			}
			break;

		case actionTypes.EMPTY:
			return action.payload;
			break;

		default:
			return state;
	}
};

export const status = (state = initialStatus, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_STATUS:
			return action.payload;
			break;

		default:
			return state;
	}
};

export const employeeProfile = combineReducers({
    employee,
    status
});