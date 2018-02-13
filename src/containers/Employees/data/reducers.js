import { combineReducers } from 'redux';
import { activeProfile } from './activeProfile/reducer';
import { allProfiles } from './allProfiles/reducer';
import { list } from './list/reducer';

export const employees = combineReducers({
    allProfiles,
	activeProfile,
    list
}); 