import * as api from './api';
import * as actionTypes from './actionTypes';
import { CONSTANTS } from '../../../../constants';

/******************** Employees Record ********************/
export const insert = payload =>({
	type: actionTypes.ALLPROFILES.INSERT,
	payload
})

export const update = payload =>({
	type: actionTypes.ALLPROFILES.UPDATE,
	payload
})

export const remove = payload =>({
	type: actionTypes.ALLPROFILES.REMOVE,
	payload
})

export const clearAll = payload =>({
	type: actionTypes.ALLPROFILES.CLEARALL,
	payload
})