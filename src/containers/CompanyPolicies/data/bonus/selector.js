import {store} from '../../../../store';

let activeID = '';

export const getAllData = () => {
	return store.getState().companyPoliciesReducer.bonus;
};


export const getDefaultActiveData = () => {
	let oAllData = {...store.getState().companyPoliciesReducer.bonus}
	let oActiveData = null;
	
	oAllData.data.map((objData, index) =>{
		if(objData.default){
			oActiveData = objData;
		}
	})
	oActiveData.schedule = sortData(oActiveData.schedule, true);
	console.log('oActiveData: ' + JSON.stringify(oActiveData))
	return oActiveData;
};

export const getRuleFromID = (id) => {
	let oAllData = {...store.getState().companyPoliciesReducer.bonus}
	let oActiveData = oAllData.data[oAllData.data.findIndex((obj => obj.id == id))];
	oActiveData.schedule = sortData(oActiveData.schedule, true);
	console.log('oActiveData: ' + JSON.stringify(oActiveData))
	return oActiveData;
};

const sortData = (data, bAscending) => {
	let oSortedData;
	if(bAscending){
		oSortedData = [...data.sort(compare)];
	}
	else{
		oSortedData = [...data.sort(compare).reverse()];
	}
	return oSortedData;
}

//Local Functions
const compare = (a,b) => {
	if (a.index < b.index)
	  return -1;
	if (a.index > b.index)
	  return 1;
	return 0;
}