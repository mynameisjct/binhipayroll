import { combineReducers } from 'redux';
import { reducer as workshiftReducer } from './workshift/reducer';
import { reducer as payrollScheduleReducer } from './payroll/reducer';
import { reducer as taxReducer } from './tax/reducer';
import { reducer as tardinessReducer } from './tardiness/reducer';
import { reducer as undertimeReducer } from './undertime/reducer';
import { reducer as overtimeReducer } from './overtime/reducer';
import { reducer as leavesReducer } from './leaves/reducer';

export const reducer = combineReducers({
	workshift: workshiftReducer,
	payroll: payrollScheduleReducer,
	tax: taxReducer,
	tardiness: tardinessReducer,
	undertime: undertimeReducer,
	overtime: overtimeReducer,
	leaves: leavesReducer
});
