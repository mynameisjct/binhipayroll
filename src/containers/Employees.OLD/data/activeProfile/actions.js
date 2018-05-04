import * as api from './api';
import * as actionTypes from './actionTypes';
import { CONSTANTS } from '../../../../constants';
import {insert} from '../../data/allProfiles/actions';

/******************** Update Active ID ********************/
export const updateActiveID = payload =>({
	type: actionTypes.ALLINFO.UPDATE.ID,
	payload
})

/******************** All Employee Info ********************/
export const clearActiveData = () =>({
	type: actionTypes.ALLINFO.REMOVE.ACTIVEDATA
})

export const getAllInfo = payload =>
	dispatch => {
		let objRes = {};
		dispatch(updateAllInfoStatus(CONSTANTS.STATUS.LOADING));

		api.getAllInfo(payload)
		.then((response) => response.json())
		.then((res) => {
			if(res.flagno == 1){
				dispatch(updateAllInfo(res));
				dispatch(insert(res.employee));
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
		/* console.log('res: ' + JSON.stringify(res)); */
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
			/* console.log('res: ' + JSON.stringify(res)); */
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
			/* console.log('res: ' + JSON.stringify(res)); */
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
	type: actionTypes.BANKINFO.UPDATE.DATA,
	payload
});

export const updateBankInfoStatus = payload => ({
	type: actionTypes.BANKINFO.UPDATE.STATUS,
	payload
});


export const updateWorkshift = payload => ({
	type: actionTypes.EMPLOYEEWORKSHIFT.UPDATE.DATA,
	payload
});


export const updateWorkshiftStatus = payload => ({
	type: actionTypes.EMPLOYEEWORKSHIFT.UPDATE.DATA,
	payload
});

export const updateCompanyBenefits = payload => ({
	type: actionTypes.EMPLOYEEBENEFITS.COMPANY.UPDATE.DATA,
	payload
});

export const updateGovernmentBenefits = payload => ({
	type: actionTypes.EMPLOYEEBENEFITS.GOVERNMENT.UPDATE.DATA,
	payload
});

export const updateRank = payload => ({
	type: actionTypes.EMPLOYEERANK.UPDATE.DATA,
	payload
});

//Employee Details
export const updateEmploymentDetails = payload => ({
	type: actionTypes.EMPLOYMENTDETAILS.UPDATE.DATA,
	payload
});

export const updateEmploymentDetailsStatus = payload => ({
	type: actionTypes.EMPLOYMENTDETAILS.UPDATE.STATUS,
	payload
});

export const addEmploymentDetailsToDB = payload =>
	async dispatch => {
		let objRes = {};
		await api.employmentinfo.details.add(payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('res: ' + JSON.stringify(res));
			if(res.flagno == 1){
				console.log('res.employee.employmentinfo.details.data: ' + JSON.stringify(res.employee.employmentinfo.details.data));
				dispatch(updateEmploymentDetails(res.employee.employmentinfo.details.data));
			}
			objRes = {...res};
		})
		.then(() => {
			return (objRes);
		})
		.catch((exception) => {
			alert(exception.message);
		});
		return(objRes);
	}

export const deleteEmploymentDetailsFromDB = payload =>
	async dispatch => {
		let objRes = {};
		await api.employmentinfo.details.delete(payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('res: ' + JSON.stringify(res));
			if(res.flagno == 1){
				console.log('res.employee.employmentinfo.details.data: ' + JSON.stringify(res.employee.employmentinfo.details.data));
				dispatch(updateEmploymentDetails(res.employee.employmentinfo.details.data));
			}
			objRes = {...res};
		})
		.then(() => {
			return (objRes);
		})
		.catch((exception) => {
			alert(exception.message);
		});
		return(objRes);
	}

export const modifyEmploymentDetailsToDB = payload =>
	async dispatch => {
		let objRes = {};
		await api.employmentinfo.details.update(payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('res: ' + JSON.stringify(res));
			if(res.flagno == 1){
				console.log('res.employee.employmentinfo.details.data: ' + JSON.stringify(res.employee.employmentinfo.details.data));
				dispatch(updateEmploymentDetails(res.employee.employmentinfo.details.data));
			}
			objRes = {...res};
		})
		.then(() => {
			return (objRes);
		})
		.catch((exception) => {
			alert(exception.message);
		});
		return(objRes);
	}

