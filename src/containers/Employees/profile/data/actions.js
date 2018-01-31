import * as api from './api';
import * as actionTypes from './actionTypes';

export const updateAllInfo = payload => ({
	type: actionTypes.UPDATE_ALLINFO,
	payload,
});

/******************** Personal Info ********************/
export const updatePersonalInfo = payload => ({
	type: actionTypes.UPDATE_PERSONALINFO,
	payload,
});

//Basic Info
export const updateBasicInfo = payload => ({
	type: actionTypes.UPDATE_BASICINFO,
	payload,
});

//Contact Info
export const updateContactInfo = payload => ({
	type: actionTypes.UPDATE_CONTACTINFO,
	payload,
});

//IDS
export const updateIDS = payload => ({
	type: actionTypes.UPDATE_IDS,
	payload,
});

//Address Info
export const updateAddress = payload => ({
	type: actionTypes.UPDATE_ADDRESS,
	payload,
});

//Dependents Info
export const updateDependents = payload => ({
    type: actionTypes.UPDATE_DEPENDENTS,
    payload,
});

/******************** Personal Info ********************/
export const updateBankInfo = payload => ({
    type: actionTypes.UPDATE_BANKINFO,
    payload,
});

export const get = payload =>
	dispatch =>
		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('===========13th Month Pay=============');
			console.log('INPUT: ' + JSON.stringify(payload));
			console.log('OUTPUT: ' + JSON.stringify(res));
			dispatch(updateAllInfo(res));
		});

/* //MOCK DATA
const mockJSON = {
	sucess: 'http://www.mocky.io/v2/5a5c40a42e00006b029f81eb',
}

export const get = payload =>
	dispatch =>
		fetchApi(mockJSON.sucess,payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('===========13th Month Pay=============');
			console.log('INPUT: ' + JSON.stringify(payload));
			console.log('OUTPUT: ' + JSON.stringify(res));
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
} */


		