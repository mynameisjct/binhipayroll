import {store} from '../../../../store';

let activeTypeID = '';

export const getAllTaxData = () => {
	return store.getState().companyPoliciesReducer.ranks;
};
