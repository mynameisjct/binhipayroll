import * as api from './api';
import * as actionTypes from './actionTypes';
import { CONSTANTS } from '../../../../constants';
import { Number } from 'tcomb-validation';

/******************** Employees Record ********************/
export const insertEmployeeRecord = payload =>({
	type: actionTypes.EMPLOYEERECORD.INSERT,
	payload
})

export const updateEmployeeRecord = payload =>({
	type: actionTypes.EMPLOYEERECORD.UPDATE,
	payload
})

export const removeEmployeeRecord = payload =>({
	type: actionTypes.EMPLOYEERECORD.REMOVE,
	payload
})

/******************** Update Active ID ********************/
export const updateActiveID = payload =>({
	type: actionTypes.ALLINFO.UPDATE.ID,
	payload
})

/******************** All Employee Info ********************/
export const getAllInfo = payload =>
	dispatch => {
		let objRes = {};
		dispatch(updateAllInfoStatus(CONSTANTS.STATUS.LOADING));

		api.getAllInfo(payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('res: ' + JSON.stringify(res));
			if(res.flagno == 1){
				dispatch(updateAllInfo(res));
			}
			objRes = {...res}
		})
		.then(() => {
			dispatch(updateAllInfoStatus([
				objRes.flagno || 0, 
				objRes.message || CONSTANTS.ERROR.SERVER
			]));
		})
		.catch((exception) => {
			dispatch(updateAllInfoStatus([
				0, 
				exception.message + '.'
			]));
			console.log('exception: ' + exception.message);
		});
	}

export const updateAllInfo = payload => ({
	type: actionTypes.ALLINFO.UPDATE.DATA,
	payload
});

export const updateAllInfoStatus = payload => ({
	type: actionTypes.ALLINFO.UPDATE.STATUS,
	payload
})


/******************** Personal Info ********************/
export const updatePersonalInfo = payload => ({
	type: actionTypes.UPDATE_PERSONALINFO,
	payload,
});

//Basic Info
export const getBasicInfo = payload =>
	dispatch => {
		let objRes = {};
		dispatch(updateBasicInfoStatus(CONSTANTS.STATUS.LOADING));
		/* console.log('payloadInAction: ' + payload); */
		api.getBasicInfo(payload)
		.then((response) => response.json())
		.then((res) => {
			/* console.log('!~!~!~!~!~res_getBasicInfo: ' + JSON.stringify(res)); */
			if(res.flagno == 1){
				dispatch(initBasicInfo(res));
			}
			objRes = {...res}
		})
		.then(() => {
			dispatch(updateBasicInfoStatus([
				objRes.flagno || 0, 
				objRes.message || CONSTANTS.ERROR.SERVER
			]));
		})
		.catch((exception) => {
			dispatch(updateBasicInfoStatus([
				0, 
				exception.message + '.'
			]));
			console.log('exception: ' + exception.message);
		});
	}

export const initBasicInfo = payload => ({
	type: actionTypes.BASICINFO.INIT.DATA,
	payload
});
	
export const updateBasicInfo = payload => ({
	type: actionTypes.BASICINFO.UPDATE.DATA,
	payload
});

export const updateBasicInfoStatus = payload => ({
	type: actionTypes.BASICINFO.UPDATE.STATUS,
	payload
});
/* 
//Contact Info
export const getContactInfo = payload =>
	dispatch => {
		let objRes = {};
		dispatch(updateContactStatus(CONSTANTS.STATUS.LOADING));

		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('res: ' + JSON.stringify(res));
			dispatch(updateContact(res));
			objRes = {...res}
		})
		.then(() => {
			dispatch(updateContactStatus([
				objRes.flagno || 0, 
				objRes.message || CONSTANTS.ERROR.SERVER
			]));
		})
		.catch((exception) => {
			dispatch(updateContactStatus([
				0, 
				exception.message + '.'
			]));
			console.log('exception: ' + exception.message);
		});
	} */

export const updateContactInfo = payload => ({
	type: actionTypes.CONTACTINFO.UPDATE.DATA,
	payload
});

export const updateContactInfoStatus = payload => ({
	type: actionTypes.CONTACTINFO.UPDATE.STATUS,
	payload
});

//IDS
export const getIDS = payload =>
	dispatch => {
		let objRes = {};
		dispatch(updateIDSStatus(CONSTANTS.STATUS.LOADING));

		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			if(res.flagno == 1){
				dispatch(updateIDS(res));
			}
			console.log('res: ' + JSON.stringify(res));
			
			objRes = {...res}
		})
		.then(() => {
			dispatch(updateIDSStatus([
				objRes.flagno || 0, 
				objRes.message || CONSTANTS.ERROR.SERVER
			]));
		})
		.catch((exception) => {
			dispatch(updateIDSStatus([
				0, 
				exception.message + '.'
			]));
			console.log('exception: ' + exception.message);
		});
	}

export const updateIDS = payload => ({
	type: actionTypes.IDS.UPDATE.DATA,
	payload,
});

export const updateIDSStatus = payload => ({
	type: actionTypes.IDS.UPDATE.STATUS,
	payload,
});

//ADDRESS
export const getAddress = payload =>
dispatch => {
	let objRes = {};
	dispatch(updateAddressStatus(CONSTANTS.STATUS.LOADING));

	api.get(payload)
	.then((response) => response.json())
	.then((res) => {
		console.log('res: ' + JSON.stringify(res));
		if(res.flagno == 1){
			dispatch(updateAddress(res));
		}
		objRes = {...res}
	})
	.then(() => {
		dispatch(updateAddressStatus([
			objRes.flagno || 0, 
			objRes.message || CONSTANTS.ERROR.SERVER
		]));
	})
	.catch((exception) => {
		dispatch(updateAddressStatus([
			0, 
			exception.message + '.'
		]));
		console.log('exception: ' + exception.message);
	});
}

export const updateAddress = payload => ({
	type: actionTypes.ADDRESS.UPDATE.DATA,
	payload
});

export const updateAddressStatus = payload => ({
	type: actionTypes.ADDRESS.UPDATE.STATUS,
	payload
});


//DEPENDENTS
export const getDependents = payload =>
	dispatch => {
		let objRes = {};
		dispatch(updateDependentsStatus(CONSTANTS.STATUS.LOADING));

		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('res: ' + JSON.stringify(res));
			if(res.flagno == 1){
				dispatch(updateDependents(res));
			}
			objRes = {...res}
		})
		.then(() => {
			dispatch(updateDependentsStatus([
				objRes.flagno || 0, 
				objRes.message || CONSTANTS.ERROR.SERVER
			]));
		})
		.catch((exception) => {
			dispatch(updateDependentsStatus([
				0, 
				exception.message + '.'
			]));
			console.log('exception: ' + exception.message);
		});
	}

export const updateDependents = payload => ({
	type: actionTypes.DEPENDENTS.UPDATE.DATA,
	payload
});

export const updateDependentsStatus = payload => ({
	type: actionTypes.DEPENDENTS.UPDATE.STATUS,
	payload
});

//BANKINFO
export const getBankInfo = payload =>
	dispatch => {
		let objRes = {};
		dispatch(updateBankInfoStatus(CONSTANTS.STATUS.LOADING));

		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('res: ' + JSON.stringify(res));
			if(res.flagno == 1){
				dispatch(updateBankInfo(res));
			}
			objRes = {...res}
		})
		.then(() => {
			dispatch(updateBankInfoStatus([
				objRes.flagno || 0, 
				objRes.message || CONSTANTS.ERROR.SERVER
			]));
		})
		.catch((exception) => {
			dispatch(updateBankInfoStatus([
				0, 
				exception.message + '.'
			]));
			console.log('exception: ' + exception.message);
		});
	}

export const updateBankInfo = payload => ({
	type: actionTypes.DEPENDENTS.UPDATE.DATA,
	payload
});

export const updateBankInfoStatus = payload => ({
	type: actionTypes.DEPENDENTS.UPDATE.STATUS,
	payload
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


		