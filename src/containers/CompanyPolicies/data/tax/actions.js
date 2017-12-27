import * as api from './api';
import * as actionTypes from './actionTypes';

export const update = payload => ({
	type: actionTypes.UPDATE,
	payload,
});

export const empty = () => ({
	type: actionTypes.EMPTY,
});

export const remove = () => ({
	type: actionTypes.REMOVE,
});

export const get = payload => 
	dispatch =>
		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
/* 			console.log('INPUT: ' + JSON.stringify(payload));
			console.log('OUTPUT: ' + JSON.stringify(res)); */
			dispatch(update(res));
		});