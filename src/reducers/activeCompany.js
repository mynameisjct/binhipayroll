import { SET_ACTIVECOMPANY } from '../constants';

const initialState = {
    name: '',
    id: ''
};


export default function activeCompanyReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_ACTIVECOMPANY":
            return {
                activecompany: action.activecompany,
            };
            break;
            
        default:
            return state;
            break;
    }
}
