import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import  { CONSTANTS } from '../../../constants';
import { updateElement } from './actions';
import * as oHelper from '../../../helper';

const initialState = null;
const initialStatus = CONSTANTS.STATUS.LOADING;

export const data = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.UPDATE:
			return dtrFormatter(action.payload);
			break;

		case actionTypes.UPDATEELEMENT:
			/* console.log('payload: ' + JSON.stringify(action.payload)) */
			let oState = oHelper.copyObject(state);
			let iData = oHelper.getElementIndexByPropValue(
				oState.currentperiod.data,
				'date',
				action.payload.date
			);
			if(iData > -1){
				oState.currentperiod.data[iData] = action.payload;
				/* console.log('oState: ' + JSON.stringify(oState.currentperiod.data[iData])); */
				return dtrFormatter(oState);
			}else{
				return state;
			}
			
			break;

		default:
			return state;
	}
};

const dtrFormatter = (payload) => {
	let oData = {...payload};
	if(oData){
		let oCurPeriod = {...oData.currentperiod};
		let oNewData = {};
		let markings = {};
		let details = {};
		oCurPeriod.data.map((oDay, iDay) => {
			markings[oDay.date] = {
				dots: [
					{color: payload.markingrules[
						oDay.timein.marking
					]},
					{color: payload.markingrules[
						oDay.timeout.marking
					]}
				]
			};

			details[oDay.date] = [{
				data: {...oDay}
			}]
		})
		/* oNewData.markings = {...markings};
		oNewData.details = {...details}; */
		oData.currentperiod.details = {...details};
		oData.currentperiod.markings = {...markings};
	}
	
	return oData;
}

const status = (state = initialStatus, action) => {
	switch (action.type) {
		case actionTypes.STATUS:
			return action.payload;
			break;
			
		default:
			return state;
	}
};

export const reducer = combineReducers({
	data: data,
	status: status
});