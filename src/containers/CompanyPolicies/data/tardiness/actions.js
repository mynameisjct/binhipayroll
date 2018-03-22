import * as api from './api';
import * as actionTypes from './actionTypes';
import  { CONSTANTS } from '../../../../constants';

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
			console.log('XXXXTARDINESS_res: ' + JSON.stringify(res));
			dispatch(update(res));
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


/* //MOCK DATA
const mockJSON = {
	sucess: 'http://www.mocky.io/v2/5a4317d53000004f35709ec2',
	error: 'http://www.mocky.io/v2/5a42ffa13000007a30709ea5'
}

export const get = payload => 
	dispatch =>
		fetchApi(mockJSON.sucess,payload)
		.then((response) => response.json())
		.then((res) => {
			dispatch(update(res));
		});

export const fetchApi = (endPoint, payload = {}, strMethod = 'post', headers = {}) => {
	return fetch(endPoint,{
		method: strMethod,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},

		body: JSON.stringify(
			payload
		)
	})
	.catch((e) => {
		if (e.response && e.response.json) {
			e.response.json().then((json) => {
				if (json) throw json;
				throw e;
			});
		} else {
			throw e;
		}
	});
}
		 */