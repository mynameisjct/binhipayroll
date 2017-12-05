import { 
    GET_WORKSHIFT
} from '../constants';

export function GetWorkShift(workshift) {
    return {
        type: 'GET_WORKSHIFT',
        workshift
    };
}