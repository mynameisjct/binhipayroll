import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';
import { CONSTANTS } from '../../../../constants';

const initialStatus = CONSTANTS.STATUS.LOADING;
const initialState = [];

export const data  = (state = initialState, action) => {
	let newArray = state.slice();
	let iData = -1;
	switch (action.type) {
        case actionTypes.ALLPROFILES.INSERT:
            iData = newArray.findIndex(obj => obj.id == action.payload.id);
			if(iData < 0) {
				newArray.splice(0, 0, action.payload);
                return newArray;
            }
            else{
                return state;
            }
			break;

		case actionTypes.ALLPROFILES.UPDATE:
			iData = newArray.findIndex(obj => obj.id == action.payload.id);
			if(iData < 0) {
				return state;
			}
			else{
				newArray.splice(iData, 1, action.payload);
				return newArray;
			}
			break;

		case actionTypes.ALLPROFILES.REMOVE:
			iData = newArray.findIndex(obj => obj.id == action.payload.id);
			if(iData < 0) {
				return state;
			}
			else{
				newArray.splice(iData, 1);
				return newArray;
			}
            break;
            
        case actionTypes.ALLPROFILES.CLEARALL:
			return [];
			break;


		default:
			return state;
	}
};

export const allProfiles = combineReducers({
    //Combined for future additional reducers
    data
}); 