import { combineReducers } from 'redux';
import { reducer as workshiftReducer } from './workshift/reducer';
import { reducer as payrollScheduleReducer } from './payroll/reducer';
import { reducer as taxReducer } from './tax/reducer';
import { reducer as tardinessReducer } from './tardiness/reducer';
import { reducer as undertimeReducer } from './undertime/reducer';
import { reducer as overtimeReducer } from './overtime/reducer';
import { reducer as leavesReducer } from './leaves/reducer';
import { reducer as benefitsReducer } from './benefits/reducer';
import { reducer as bonusReducer } from './bonus/reducer';
import { reducer as ranksReducer } from './ranks/reducer';
import { reducer as positionsReducer } from './positions/reducer';
import { reducer as savingsReducer } from './savings/reducer';

export const reducer = combineReducers({
	workshift: workshiftReducer,
	payroll: payrollScheduleReducer,
	tax: taxReducer,
	tardiness: tardinessReducer,
	undertime: undertimeReducer,
	overtime: overtimeReducer,
	leaves: leavesReducer,
	benefits: benefitsReducer,
	bonus: bonusReducer,
	ranks: ranksReducer,
	positions: positionsReducer,
	savings: savingsReducer
});