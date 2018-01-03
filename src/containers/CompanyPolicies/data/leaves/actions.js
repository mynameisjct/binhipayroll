import * as api from './api';
import * as actionTypes from './actionTypes';

export const update = payload => ({
	type: actionTypes.UPDATE,
	payload,
});

export const empty = () => ({
	type: actionTypes.EMPTY,
});

/* export const get = payload =>
	dispatch =>
		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('========================');
			console.log('INPUT: ' + JSON.stringify(payload));
			console.log('OUTPUT: ' + JSON.stringify(res));
			dispatch(update(res));
		});
 */

//MOCK DATA
const mockJSON = {
	sucess: 'http://www.mocky.io/v2/5a4c974a3000003f32a69921',
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
		