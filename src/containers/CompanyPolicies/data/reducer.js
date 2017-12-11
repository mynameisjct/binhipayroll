import { combineReducers } from 'redux';
import { reducer as usersReducer } from './workshift/reducer';

export const reducer = combineReducers({
	users: usersReducer,
});
