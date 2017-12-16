/* import * as api from './api';
import * as actionTypes from './actionTypes';

const update = items => ({
	type: actionTypes.UPDATE,
	items,
});

export const empty = () => ({
	type: actionTypes.EMPTY,
});

export const get = payload =>
	dispatch =>
		api.get(payload)
		.then(response => dispatch(update(response.users))); */

import * as api from './api';
import * as actionTypes from './actionTypes';

const update = workshift => ({
	type: actionTypes.UPDATE,
	workshift,
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
			dispatch(update(res));
		});