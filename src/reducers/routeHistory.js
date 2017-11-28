import { SET_ROUTEHISTORY } from '../constants';

const initialState = {
    name: '',
    title: '',
    mode: ''
};


export default function routeHistoryReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_ROUTEHISTORY":
            return {
                routehistory: action.routehistory,
            };
            break;
            
        default:
            return state;
            break;
    } 
}
