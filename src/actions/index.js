import { 
    SET_LOGININFO, 
    SET_ACTIVECOMPANY,
    SET_ROUTEHISTORY,
    SET_DATAACTIONTRIGGER,
} from '../constants';

export function SetLoginInfo(logininfo) {
    return {
        type: 'SET_LOGININFO',
        logininfo
    };
}

export function SetActiveCompany(activecompany) {
    return {
        type: 'SET_ACTIVECOMPANY',
        activecompany
    };
}

export function SetRouteHistory(routehistory) {
    return {
        type: 'SET_ROUTEHISTORY',
        routehistory
    };
}

export function SetActiveBranch(activebranch) {
    return {
        type: 'SET_ACTIVEBRANCH',
        activebranch
    };
}

export function SetDataActionTrigger(dataactiontrigger) {
    return {
        type: 'SET_DATAACTIONTRIGGER',
        dataactiontrigger
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(itemsFetchDataSuccess(items)))
            .catch(() => dispatch(itemsHasErrored(true)));
    };
}