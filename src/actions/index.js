import { 
    SET_LOGININFO, 
    SET_ACTIVECOMPANY,
    SET_ROUTEHISTORY,
    SET_DATAACTIONTRIGGER,
    SET_ACTIVEBRANCH,
    FETCH_HAS_ERRORED,
    FETCH_IS_LOADING,
    UPDATE_WORKSHIFT

} from '../constants';

import {
    GetWorkShift, 
    UpdateWorkShift, 
    WorkShiftIsLoading,
    WorkShiftHasErrored
} from './companyPolicies';

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

export function FetchDataFromDB(objData) {
/*     console.log('VNXTEST1====================================')
    console.log('objData.url: ' + objData.url);
    console.log('objData.strType: ' + objData.strType);
    console.log('INPUT: ' + JSON.stringify(objData.input)); */
    return (dispatch) => {
        switch(objData.strModule.toUpperCase()){
            case ('WORKSHIFT'):
                dispatch(WorkShiftIsLoading(true));
                dispatch(WorkShiftHasErrored(false));
                break;
            default: 
                break;
        };
        
/*         console.log('ENTERED DISPATCH FUNCTION'); */

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
/*             console.log('OUTPUT: ' + JSON.stringify(res)); */
            switch(objData.strType.toUpperCase()){
                case 'WORKSHIFT_GET':
                    dispatch(GetWorkShift(res))
                    break;

                case 'WORKSHIFT_UPDATE':
                    dispatch(UpdateWorkShift(res))
                default: 
                    break;
            };

            switch(objData.strModule.toUpperCase()){
                case ('WORKSHIFT'):
                    dispatch(WorkShiftIsLoading(false));
                    break;
                default: 
                    break;
            };
        })
        .catch((error) => {
            console.log('error: ' + error)
            switch(objData.strModule.toUpperCase()){
                case ('WORKSHIFT'):
                    dispatch(WorkShiftHasErrored(true));
                    break;
                default: 
                    break;
            };
            
            
        })
    }

}