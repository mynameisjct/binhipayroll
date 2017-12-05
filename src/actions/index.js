import { 
    SET_LOGININFO, 
    SET_ACTIVECOMPANY,
    SET_ROUTEHISTORY,
    SET_DATAACTIONTRIGGER,
    SET_ACTIVEBRANCH,
    FETCH_HAS_ERRORED,
    FETCH_IS_LOADING,

} from '../constants';

import {GetWorkShift} from './companyPolicies';

export function SetLoginInfo(logininfo) {
    return {
        type: SET_LOGININFO,
        logininfo
    };
}

export function SetActiveCompany(activecompany) {
    return {
        type: SET_ACTIVECOMPANY,
        activecompany
    };
}

export function SetRouteHistory(routehistory) {
    return {
        type: SET_ROUTEHISTORY,
        routehistory
    };
}

export function SetActiveBranch(activebranch) {
    return {
        type: SET_ACTIVEBRANCH,
        activebranch
    };
}

export function SetDataActionTrigger(dataactiontrigger) {
    return {
        type: SET_DATAACTIONTRIGGER,
        dataactiontrigger
    };
}

//Database fetching
export function FetchHasErrored(bool) {
    return {
        type: FETCH_HAS_ERRORED,
        hasErrored: bool
    };
}

export function FetchIsLoading(bool) {
    return {
        type: FETCH_IS_LOADING,
        isLoading: bool
    };
}

export function FetchDataFromDB(objData) {
    console.log('VNXTEST1====================================')
    console.log('objData.url: ' + objData.url);
    console.log('objData.strType: ' + objData.strType);

    return (dispatch) => {
        dispatch(FetchIsLoading(true));
        console.log('ENTERED DISPATCH FUNCTION');

        fetch(objData.url,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(
                objData.input
            )

        }).then((response) => response.json())
        .then((res) => {
            switch(objData.strType.toUpperCase()){
                case 'GET_WORKSHIFT':
                    dispatch(GetWorkShift(res))
                    break;

                default: 
                    break;
            };
            dispatch(FetchIsLoading(false));
        })
        .catch((error) => {
            dispatch(FetchHasErrored(true));
            console.log("TEST ERROR: " + error);
        })
    }

}