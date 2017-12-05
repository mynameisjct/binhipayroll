import { SET_ACTIVEBRANCH } from '../constants';

const initialState = {
    id: '',
    name: '',
    address: '',
    contact: [''],
    email: ''
};

export default function activeBranchReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_ACTIVEBRANCH":
            return {
                activebranch: action.activebranch,
            };
            break;
            
        default:
            return state;
            break;
    }
}