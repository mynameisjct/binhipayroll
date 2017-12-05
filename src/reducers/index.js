import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import activeCompanyReducer from './activeCompany';
import routeHistoryReducer from './routeHistory';
import activeBranchReducer from './activeBranch';
import dataActionTriggerReducer  from './dataActionTrigger';
import {fetchHasErrored, fetchIsLoading}  from './fetchData';

//Company Policy
import GetWorkShift from '../containers/CompanyPolicies/reducers';

const rootReducer= combineReducers({
    loginReducer,
    activeCompanyReducer,
    routeHistoryReducer,
    activeBranchReducer,
    dataActionTriggerReducer,
    GetWorkShift,
    fetchHasErrored,
    fetchIsLoading
});

export default rootReducer;