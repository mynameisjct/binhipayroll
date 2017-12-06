import { 
    WORKSHIFT_GET, 
    WORKSHIFT_UPDATE,
    WORKSHIFT_HAS_ERRORED,
    WORKSHIFT_IS_LOADING
 } from '../../constants';

export default function GetWorkShift(state = null, action) {
    switch (action.type) {

        case WORKSHIFT_GET:
            return action.workshift;

        default:
            return state;
    }
}

export function UpdateWorkShift(state=null, action){
    switch (action.type) {
        case WORKSHIFT_UPDATE:
            return action.response;

        default:
            return state;
    }
}

export function WorkShiftHasErrored(state = false, action) {
    switch (action.type) {
        case WORKSHIFT_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function WorkShiftIsLoading(state = true, action) {
    switch (action.type) {
        case WORKSHIFT_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}