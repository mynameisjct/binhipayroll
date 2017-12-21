import {store} from '../../../../store';

export const getTardinessData = () => {
	return store.getState().companyPoliciesReducer.getAllTardiness;
};
