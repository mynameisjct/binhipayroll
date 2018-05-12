import {combineReducers} from 'redux';
import loginReducer from './loginReducer';
import activeCompanyReducer from './activeCompany';
import routeHistoryReducer from './routeHistory';
import activeBranchReducer from './activeBranch';
import dataActionTriggerReducer  from './dataActionTrigger';
import {reducer as companyPoliciesReducer} from './../containers/CompanyPolicies/data/reducer';
import {employees} from './../containers/Employees/data/reducers';
import {companyProfile} from './../containers/CompanyProfile/data/reducer';
import { reducer as dtrReducer } from './../containers/DTR/data/reducer';
/* import { reducer as transactionsReducer } from './../containers/Transactions/data/reducer'; */
import { reducer as payrollGenerationReducer } from './../containers/PayrollGeneration/data/reducer';
import { reducer as servicesReducer } from '../services/reducer';
import { reducer as reportsReducer } from '../containers/Reports/data/reducer';

const rootReducer= combineReducers({
    loginReducer,
    activeCompanyReducer,
    routeHistoryReducer,
    activeBranchReducer,
    dataActionTriggerReducer,
    companyPoliciesReducer,
    employees,
    companyProfile,
    dtr: dtrReducer,
    /* transactions: transactionsReducer, */
    payrollGeneration: payrollGenerationReducer,
    services: servicesReducer,
    reports: reportsReducer
});

export default rootReducer;