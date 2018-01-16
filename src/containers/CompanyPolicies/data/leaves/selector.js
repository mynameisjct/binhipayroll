import {store} from '../../../../store';

let activeID = '';

export const getAllData = () => {
	return store.getState().companyPoliciesReducer.leaves;
};


export const getDefaultActiveData = () => {
	let oAllData = {...store.getState().companyPoliciesReducer.leaves}
	let oActiveData = null;
	let bFlag = false;

	oAllData.data.map((objData, index) =>{
		if(objData.default){
			oActiveData = objData;
		}
	})

	if(oActiveData==null){
		let iLen = oAllData.data.length;
		oActiveData = oAllData.data[iLen-1];
	}

	console.log('oActiveData: ' + JSON.stringify(oActiveData))
	return oActiveData;
};

export const getDefaultData = (id) => {
	let oAllData = {...store.getState().companyPoliciesReducer.leaves}
	let oActiveData = oAllData.default

	console.log('oActiveData: ' + JSON.stringify(oActiveData))
	return oActiveData;
};

export const getRuleFromID = (id) => {
	let oAllData = {...store.getState().companyPoliciesReducer.leaves}
	let oActiveData = oAllData.data[oAllData.data.findIndex((obj => obj.id == id))];

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
	if (Number(a.index) < Number(b.index))
	  return -1;
	if (Number(a.index) > Number(b.index))
	  return 1;
	return 0;
}