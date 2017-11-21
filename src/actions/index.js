import { 
    SET_LOGININFO, 
    SET_ACTIVECOMPANY 
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