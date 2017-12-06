import { 
    WORKSHIFT_UPDATE,
    WORKSHIFT_GET,
    WORKSHIFT_HAS_ERRORED,
    WORKSHIFT_IS_LOADING
} from '../constants';

export function GetWorkShift(workshift) {
    return {
        type: WORKSHIFT_GET,
        workshift
    };
}

export function UpdateWorkShift(response) {
    return {
        type: WORKSHIFT_UPDATE,
        response
    };
}

export function WorkShiftHasErrored(bool) {
    return {
        type: WORKSHIFT_HAS_ERRORED,
        hasErrored: bool
    };
}

export function WorkShiftIsLoading(bool) {
    return {
        type: WORKSHIFT_IS_LOADING,
        isLoading: bool
    };
}