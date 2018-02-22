import {store} from '../../../../store';

let activeTypeID = '';

export const getAllWorkShift = () => {
	return store.getState().companyPoliciesReducer.workshift.data.schedule;
};

export const getAllBreakTime = () => {
	return store.getState().companyPoliciesReducer.workshift.data.breaktime;	
};

export const getWorkShiftObject = () => {
	return store.getState().companyPoliciesReducer.workshift.data;	
};

export const getDefaultActiveSchedule = () => {
	try{
		let oSchedule = [...store.getState().companyPoliciesReducer.workshift.data.schedule];
		let iActiveID = oSchedule.find(_findActive);
		return iActiveID;
	}
	catch(exception){
		return {}
	}
};

export const getScheduleFromTypeID = async(id) => {
	activeTypeID = id; 
	let oSchedule = [...store.getState().companyPoliciesReducer.workshift.data.schedule];
	let iActiveID = await oSchedule.find(_findScheduleFromTypeID);
	return iActiveID;
};

export const getDefaultSchedule = () => {
	return store.getState().companyPoliciesReducer.workshift.data.defaultschedule;	
}

//Not utilized in current logic
export const getWorkShifTypes = () => {
	let oSchedule = [...store.getState().companyPoliciesReducer.workshift.data.schedule];
	let arrList = 
		oSchedule.map(oKey => 
			({
				name: oKey.description,
				id: oKey.id
			})
		);

	return arrList;
};

//Local Functions
function _findActive(oSchedule) {
	return oSchedule.defaultactive == true
}

function _findScheduleFromTypeID(oSchedule) {
	return oSchedule.id == activeTypeID
}