import {store} from '../../../../store';

let activeTypeID = '';

export const getAllPayrollSchedule = () => {
	return store.getState().companyPoliciesReducer.tax;
};
