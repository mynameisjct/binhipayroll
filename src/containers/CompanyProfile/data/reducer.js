import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';
import { CONSTANTS } from '../../../constants';
import * as oHelper from '../../../helper';

const initialStatus = CONSTANTS.STATUS.LOADING;
const initialState = {
	id: '',
    branch: []
}

export const data = (state = initialState, action) => {
	let oState = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case actionTypes.BRANCH.UPDATE.DATA:
			oState.branch = action.payload;
			return {
				...oState
			}
			break;

		default:
			return state;
	}
};

export const branchStatus = (state = initialStatus, action) => {
	switch (action.type) {
		case actionTypes.BRANCH.UPDATE.STATUS:
			return action.payload;
			break;

		default:
			return state;
	}
};

export const companyProfile = combineReducers({
    data,
	branchStatus
}); 

