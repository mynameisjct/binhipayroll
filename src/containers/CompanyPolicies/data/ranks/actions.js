import * as api from './api';
import * as actionTypes from './actionTypes';
import  { CONSTANTS } from '../../../../constants';

export const update = payload => ({
	type: actionTypes.UPDATE,
	payload,
});

export const updateLeaves = payload => ({
	type: actionTypes.UPDATE_LEAVES,
	payload
})

export const updateOvertime = payload => ({
	type: actionTypes.UPDATE_OVERTIME,
	payload
})

export const updateUndertime = payload => ({
	type: actionTypes.UPDATE_UNDERTIME,
	payload
})

export const updateTardiness = payload => ({
	type: actionTypes.UPDATE_TARDINESS,
	payload
})

export const empty = () => ({
	type: actionTypes.EMPTY,
});

export const remove = () => ({
	type: actionTypes.REMOVE,
});

export const updateStatus = payload => ({
	type: actionTypes.STATUS,
	payload,
});

export const setActiveRule = payload => ({
	type: actionTypes.ACTIVERULE,
	payload
});



export const get = payload => 
	dispatch => {
		let objRes = {};
		dispatch(updateStatus(CONSTANTS.STATUS.LOADING));

		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			dispatch(update(res));
			if(res.data.length > 0){
				dispatch(setActiveRule(res.data[0]));
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