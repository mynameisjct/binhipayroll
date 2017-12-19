import { combineReducers } from 'redux';
import { reducer as workshiftReducer } from './workshift/reducer';
import { reducer as payrollScheduleReducer } from './payroll/reducer';
import { reducer as taxReducer } from './tax/reducer';

export const reducer = combineReducers({
	workshift: workshiftReducer,
	payroll: payrollScheduleReducer,
	tax: taxReducer
});
