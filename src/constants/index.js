// constants.js

//SESSION
const SET_LOGININFO = 'SET_LOGININFO';

//ACTIVE COMPANY
const SET_ACTIVECOMPANY = 'SET_ACTIVECOMPANY';

//ROUTE INFORMATION
const SET_ROUTEHISTORY = 'SET_ROUTEHISTORY';

//ACTIVE BRANCH
const SET_ACTIVEBRANCH = 'SET_ACTIVEBRANCH';

//DATA ACTION TRIGGER
const SET_DATAACTIONTRIGGER = 'SET_DATAACTIONTRIGGER';

//ACTIVECOMPANY
const SET_ACTIVECOMPANYID = 'SET_ACTIVECOMPANYID';

//Company Policies - WORKSHIFT
const WORKSHIFT_GET = 'WORKSHIFT_GET';
const WORKSHIFT_UPDATE = 'WORKSHIFT_UPDATE';
const WORKSHIFT_HAS_ERRORED = 'WORKSHIFT_HAS_ERRORED';
const WORKSHIFT_IS_LOADING = 'WORKSHIFT_IS_LOADING';

export {
    SET_LOGININFO,
    SET_ACTIVECOMPANY,
    SET_ROUTEHISTORY,
    SET_ACTIVEBRANCH,
    SET_DATAACTIONTRIGGER,
    SET_ACTIVECOMPANYID,
    WORKSHIFT_GET,
    WORKSHIFT_UPDATE,
    WORKSHIFT_HAS_ERRORED,
    WORKSHIFT_IS_LOADING
};

export const CONSTANTS = {

    //ERROR MESSAGES
    ERROR: {
        SERVER: 'An Unknown Error in the server was encountered. Please contact BINHI-MeDFI.',
        UNKNOWN: 'An Unknown Error was encountered. Please contact BINHI-MeDFI.',
        SOMETHING: 'Something went wrong.',
        FORM: 'Something went wrong. Refresh the form and try again.'
    },

    //LOADING MESSAGES
    LOADING:'Loading...',

    //COMPONENT STATUS
    STATUS: {
        ERROR: [0, ''],
        LOADING: [2, 'Loading...'],
        SUCCESS: [1, 'Success!']
    },

    //SUFFIX
    SUFFIX: {
        CONTACT: 'Or please contact BINHI-MeDFI.',
    },

    SPLITSTRING: '_SPLITSTRING_'
}