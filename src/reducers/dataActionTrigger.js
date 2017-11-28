import { SET_DATAACTIONTRIGGER } from '../constants';

const initialState = {
    saveTrigger: false,
    disabledSave: true
};


export default function dataActionTriggerReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_DATAACTIONTRIGGER":
            return {
                dataactiontrigger: action.dataactiontrigger,
            };
            break;
            
        default:
            return state;
            break;
    } 
}
