import { SET_LOGININFO } from '../constants';

const initialState = {
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
    console.log('i was here @ loginReducer function');
    console.log('action.type: ' + action.type);
    console.log('test ' + action.logininfo);
    
/*     let objTest = action.logininfo;
    Object.keys(objTest).map(key => {
        console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
        console.log('KEY: ' + key);
        console.log('VALUE: ' + objTest[key]);
        console.log('KEY-TYPE: ' + typeof(key));
        console.log('VALUE-TYPE: ' + typeof(objTest[key]));
    }); */
    switch (action.type) {
        case "SET_LOGININFO":
        console.log('STOP1!!!');
            return {
                logininfo: action.logininfo,
            };
            break;
            
        default:
            console.log('STOP2!!!');
            return state;
            break;
    }
}
