import * as api from './api';
import * as actionTypes from './actionTypes';

const update = companypayroll => ({
	type: actionTypes.UPDATE,
	companypayroll,
});

export const empty = () => ({
	type: actionTypes.EMPTY,
});

export const get = payload => 
	dispatch =>
		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			dispatch(update(res));
		});