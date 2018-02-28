import {store} from '../../../../store';

let activeID = '';

export const getAllData = () => {
	return store.getState().companyPoliciesReducer.bonus.data;
};


export const getDefaultActiveData = () => {
	let oAllData = {...store.getState().companyPoliciesReducer.bonus.data}
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
	oActiveData.schedule = sortData(oActiveData.schedule, true);
	_addDummySchedule(oActiveData);

	console.log('oActiveData: ' + JSON.stringify(oActiveData))
	return oActiveData;
};

export const getRuleFromID = (id) => {
	let oAllData = {...store.getState().companyPoliciesReducer.bonus.data}
	let oActiveData = oAllData.data[oAllData.data.findIndex((obj => obj.id == id))];
	oActiveData.schedule = sortData(oActiveData.schedule, true);
	_addDummySchedule(oActiveData);

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

const _addDummySchedule = (oActiveData) => {
	let oData = {...oActiveData}
	if(oData.schedule.length<12){
		let iNextIndex = oData.schedule.length + 1;
		for(i=iNextIndex; i<=12; i++){
			oData.schedule.push({
				"index":String(i),
				"date":{
					"label":"Select Date",
					"value":""
				},
				"editable": true
			})
		}
	}
	return(oData)
}