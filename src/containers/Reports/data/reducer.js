import { combineReducers } from 'redux';
import { reducer as payrollScheduleReducer } from './workshift/reducer';

export const reducer = combineReducers({
	payrollSchedule: payrollScheduleReducer
});