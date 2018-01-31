import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import activeCompanyReducer from './activeCompany';
import routeHistoryReducer from './routeHistory';
import activeBranchReducer from './activeBranch';
import dataActionTriggerReducer  from './dataActionTrigger';
import {reducer as companyPoliciesReducer} from './../containers/CompanyPolicies/data/reducer';
import {employeeProfile} from './../containers/Employees/profile/data/reducer';
import {reducer as employeeList} from './../containers/Employees/list/data/reducer';

const rootReducer= combineReducers({
    loginReducer,
    activeCompanyReducer,
    routeHistoryReducer,
    activeBranchReducer,
    dataActionTriggerReducer,
    companyPoliciesReducer,
    employeeProfile,
    employeeList
});

export default rootReducer;