import { SET_LOGININFO } from '../constants';

const initialState = {
    resUsername: '',
    resSuccess: '',
    resMsg: '',
    resUserGroup: '',
    resFName: '',
    resMName: '',
    resLName: '',
    resCompany: '',
    resBranch: '',
    resPosition: '',
    resAccessToken: '',
};


export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_LOGININFO":
            return {
                logininfo: action.logininfo,
            };
            break;
            
        default:
            return state;
            break;
    }
}
