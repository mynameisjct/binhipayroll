import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import activeCompanyReducer from './activeCompany';
import routeHistoryReducer from './routeHistory';
import activeBranchReducer from './activeBranch';
import dataActionTriggerReducer  from './dataActionTrigger';
import {reducer as companyPoliciesReducer} from './../containers/CompanyPolicies/data/reducer';
import {employees} from './../containers/Employees/data/reducers';

const rootReducer= combineReducers({
    loginReducer,
    activeCompanyReducer,
    routeHistoryReducer,
    activeBranchReducer,
    dataActionTriggerReducer,
    companyPoliciesReducer,
    employees
});

export default rootReducer;