import {combineReducers} from 'redux';
import loginReducer from './loginReducer.js';
import activeCompanyReducer from './activeCompany.js';

const rootReducer= combineReducers({
    loginReducer,
    activeCompanyReducer
});

export default rootReducer;