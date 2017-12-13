import {store} from '../../../../store';

let activeTypeID = '';

export const getAllWorkShift = () => {
	return store.getState().companyPoliciesReducer.workshift.schedule;
};

export const getAllBreakTime = () => {
	return store.getState().companyPoliciesReducer.workshift.breaktime;	
};

export const getWorkShiftObject = () => {
	return store.getState().companyPoliciesReducer.workshift;	
};

export const getDefaultActiveType = () => {
	let oSchedule = [...store.getState().companyPoliciesReducer.workshift.schedule];
	let iActiveID = oSchedule.find(_findActive);
	return iActiveID;
};

export const getScheduleFromTypeID = (id) => {
	activeTypeID = id; 
	let oSchedule = [...store.getState().companyPoliciesReducer.workshift.schedule];
	let iActiveID = oSchedule.find(_findScheduleFromTypeID);
	return iActiveID;
};

//Not utilized in current logic
export const getWorkShifTypes = () => {
	let oSchedule = [...store.getState().companyPoliciesReducer.workshift.schedule];
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