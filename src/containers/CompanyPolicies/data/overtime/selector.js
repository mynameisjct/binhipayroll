import {store} from '../../../../store';

let activeID = '';

export const getOvertimeData = () => {
	return store.getState().companyPoliciesReducer.overtime;
};
