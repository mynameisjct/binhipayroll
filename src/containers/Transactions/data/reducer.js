import { combineReducers } from 'redux';
import { reducer as payrollTransactionReducer } from './payrollTransaction/reducer';

export const reducer = combineReducers({
	payrollList: payrollTransactionReducer
});