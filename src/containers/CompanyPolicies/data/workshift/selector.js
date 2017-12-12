import {store} from '../../../../store';

export const getAllWorkShift = () => {
	return store.getState().companyPoliciesReducer.workshift.schedule;
};

export const getAllBreakTime = () => {
	return store.getState().companyPoliciesReducer.workshift.breaktime;	
};

export const getWorkShiftObject = () => {
	return store.getState().companyPoliciesReducer.workshift;	
};