import {combineReducers} from 'redux';
import loginReducer from './loginReducer.js';

const rootReducer= combineReducers({
    loginReducer,
});

export default rootReducer;