import {store} from '../../../../store';

let activeID = '';

export const getUndertimeData = () => {
	return store.getState().companyPoliciesReducer.undertime;
};
