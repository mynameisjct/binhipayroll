import { combineReducers } from 'redux';
import { reducer as payrollScheduleReducer } from './payrollSchedule/reducer';

export const reducer = combineReducers({
	payrollSchedule: payrollScheduleReducer
});