import { SET_ACTIVECOMPANYID } from '../constants';

const initialState = {
    name: '',
    id: ''
};


export default function activeCompanyIdReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_ACTIVECOMPANY":
            return {
                activecompanyid: action.activecompanyid,
            };
            break;
            
        default:
            return state;
            break;
    }
}
