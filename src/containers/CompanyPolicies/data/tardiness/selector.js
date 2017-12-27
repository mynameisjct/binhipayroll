import {store} from '../../../../store';

let activeID = '';

export const getTardinessData = () => {
	return store.getState().companyPoliciesReducer.tardiness;
};

export const getDefaultActiveTardiness = () => {
	let oData = [...store.getState().companyPoliciesReducer.tardiness.data];
	let oSortedData = [...oData.sort(compare)];
	let oDefaultActive = {...oSortedData[0]};
	return oDefaultActive;
}

export const getActiveTardinessFromID = (value) => {
	try{
		activeID = value;
		let oData = [...store.getState().companyPoliciesReducer.tardiness.data];
		let oActiveData = oData.find(_findActive);
		return oActiveData;
	}
	catch(exception){
		return null
	}
}


//Local Functions
function compare(a,b) {
	if (a.id < b.id)
	  return -1;
	if (a.id > b.id)
	  return 1;
	return 0;
}

function _findActive(oData) {
	return oData.id == activeID
}
