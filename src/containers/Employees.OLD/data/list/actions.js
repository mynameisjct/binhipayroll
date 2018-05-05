import * as api from './api';
import * as actionTypes from './actionTypes';
import {CONSTANTS} from '../../../../constants';

export const update = payload => ({
	type: actionTypes.UPDATE,
	payload,
});

export const empty = () => ({
	type: actionTypes.EMPTY,
});

export const get = payload =>
	dispatch => {
		let objRes = {};
		dispatch(updateStatus(CONSTANTS.STATUS.LOADING));

		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			/* console.log('res: ' + JSON.stringify(res)); */
			if(res.flagno == 1){
				dispatch(update(res.data));
			}
			objRes = {...res}
		})
		.then(() => {
			dispatch(updateStatus([
				objRes.flagno || 0, 
				objRes.message || CONSTANTS.ERROR.SERVER
			]));
		})
		.catch((exception) => {
			dispatch(updateStatus([
				0, 
				exception.message + '.'
			]));
			console.log('exception: ' + exception.message);
		});
	}

export const updateStatus = payload => ({
	type: actionTypes.STATUS,
	payload,
});