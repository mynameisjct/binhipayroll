import { 
    WORKSHIFT_GET, 
    WORKSHIFT_UPDATE,
    WORKSHIFT_HAS_ERRORED,
    WORKSHIFT_IS_LOADING
 } from '../../constants';

//*****************************WORKSHIFT******************************/
export default function GetWorkShift(state = null, action) {
    switch (action.type) {

        case WORKSHIFT_GET:
            return action.workshift;

        default:
            return state;

    }
}

export function UpdateWorkShift(state={flagno: -1}, action){
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

//*****************************BREAKTIME******************************/

//*****************************PAYROLL******************************/
const initPayrollData = {

    flagno: "1",
    message: "0",
    paytype:{
            label: "Payroll Type",
            value: "Semi-Monthly",
            options: ["Semi-Monthly","Monthly","Weekly"]
        },
    data:{
        firstpayday:{
            label: "First pay day",
            value: "15",
            options: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
        },

        secondpayday:{
            label:"second pay day",
            value:"30"
        },

        cutoff:{
            label:"Cut-off",
            value:"5",
            options:["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
        },
        
        firstperiod:{
            label: "First period",
            value:"25-09"
        },
        
        secondperiod:{
            label:"Second Period",
            value:"10-24"
        }
    }
}


        export function PayrollStoreData(state = true, action){
            
        }

        export function PayrollStateData(state = true, action){

        }

        export function PayrollUpdate(state = true, action){
            
        }

        export function PayrollHasErrored(state = false, action) {
            switch (action.type) {
                case WORKSHIFT_HAS_ERRORED:
                    return action.hasErrored;

                default:
                    return state;
            }
        }

        export function PayrollIsLoading(state = true, action) {
            switch (action.type) {
                case WORKSHIFT_IS_LOADING:
                    return action.isLoading;

                default:
                    return state;
            }
        }