import {store} from '../../../../store';

export const getPayrollData = () => {
	return store.getState().companyPoliciesReducer.payroll;
};