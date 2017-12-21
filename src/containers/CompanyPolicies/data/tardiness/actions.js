import * as api from './api';
import * as actionTypes from './actionTypes';

const update = tardiness => ({
	type: actionTypes.UPDATE,
	tardiness,
});

export const empty = () => ({
	type: actionTypes.EMPTY,
});

export const remove = () => ({
	type: actionTypes.REMOVE,
});

/* export const get = payload => 
	dispatch =>
		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			dispatch(update(res));
		}); */
const mockJSON = {
	sucess: 'http://www.mocky.io/v2/5a3b62683000009b0782d131',
	error: 'http://www.mocky.io/v2/5a3b6644300000830882d13b'
}
export const get = payload => 
	dispatch =>
		fetchApi(mockJSON.error,payload)
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
		