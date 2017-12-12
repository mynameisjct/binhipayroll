
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export let store;

export default function configureStore() {
    store = createStore(
        rootReducer,
        applyMiddleware(thunk)
    );
    return store;
}