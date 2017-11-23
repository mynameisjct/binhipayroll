import {combineReducers} from 'redux';
import loginReducer from './loginReducer.js';
import activeCompanyReducer from './activeCompany.js';
import routeHistoryReducer from './routeHistory.js';
import activeBranchReducer from './activeBranch.js';

const rootReducer= combineReducers({
    loginReducer,
    activeCompanyReducer,
    routeHistoryReducer,
    activeBranchReducer
});

export default rootReducer;