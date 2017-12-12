import { combineReducers } from 'redux';
import { reducer as workshiftReducer } from './workshift/reducer';

export const reducer = combineReducers({
	workshift: workshiftReducer,
});
