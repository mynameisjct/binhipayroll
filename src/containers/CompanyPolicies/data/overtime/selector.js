import {store} from '../../../../store';

let activeID = '';

export const getAllData = () => {
	return store.getState().companyPoliciesReducer.overtime.data;
};

export const getDefaultActiveRule = () => {
	try{
		let oData = [...store.getState().companyPoliciesReducer.overtime.data.data];
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

export const getActiveRuleFromID = (value) => {
	try{
		activeID = value;
		let oData = [...store.getState().companyPoliciesReducer.overtime.data.data];
		let oActiveData = oData.find(_findActive);
		return oActiveData;
	}
	catch(exception){
		return null
	}
}

export const getDefaultRule = () => {
	return {...store.getState().companyPoliciesReducer.overtime.data.default};
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
