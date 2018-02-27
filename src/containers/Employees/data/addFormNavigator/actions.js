import * as actionTypes from './actionTypes';

/******************** Update Active ID ********************/
export const triggerNext = payload =>({
	type: actionTypes.TRIGGERNEXT,
	payload
})