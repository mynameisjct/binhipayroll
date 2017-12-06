import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import activeCompanyReducer from './activeCompany';
import routeHistoryReducer from './routeHistory';
import activeBranchReducer from './activeBranch';
import dataActionTriggerReducer  from './dataActionTrigger';

//Company Policy
import GetWorkShift, {
    UpdateWorkShift, 
    WorkShiftHasErrored, 
    WorkShiftIsLoading
} from '../containers/CompanyPolicies/reducers';

const rootReducer= combineReducers({
    loginReducer,
    activeCompanyReducer,
    routeHistoryReducer,
    activeBranchReducer,
    dataActionTriggerReducer,
    WorkShiftHasErrored,
    WorkShiftIsLoading,
    GetWorkShift,
    UpdateWorkShift
});

export default rootReducer;