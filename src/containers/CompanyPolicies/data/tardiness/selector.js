import {store} from '../../../../store';

let activeID = '';

export const getTardinessData = () => {
	return store.getState().companyPoliciesReducer.tardiness.data;
};

export const getDefaultActiveTardiness = () => {
	try{
		let oData = [...store.getState().companyPoliciesReducer.tardiness.data.data];
		let oSortedData = [...oData.sort(compare).reverse()];
		let oDefaultActive = {...oSortedData[0]};
		if (Object.keys(oDefaultActive).length === 0 ){
			return null;
		}
		else{
			return oDefaultActive;
		}
	}
	catch(exception){
		return null;
	}
}

export const getActiveTardinessFromID = (value) => {
	try{
		activeID = value;
		let oData = [...store.getState().companyPoliciesReducer.tardiness.data.data];
		let oActiveData = oData.find(_findActive);
		return oActiveData;
	}
	catch(exception){
		return null
	}
}

export const getDefaultTardiness = () => {
	return {...store.getState().companyPoliciesReducer.tardiness.data.defaultdata};
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
