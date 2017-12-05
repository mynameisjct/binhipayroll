import { GET_WORKSHIFT } from '../../constants';

export default function GetWorkShift(state = null, action) {
    switch (action.type) {

        case GET_WORKSHIFT:
            return action.workshift;

        default:
            return state;
    }
}
