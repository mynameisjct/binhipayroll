import {store} from '../../../../store';

let activeID = '';

export const getAllData = () => {
	return store.getState().companyPoliciesReducer.benefits.data;
};
