import { SET_LOGININFO } from '../constants';

export function SetLoginInfo(logininfo) {
    console.log('-------------------------------');
    console.log('i was here @ SetLoginInfo');
    console.log('SetLoginInfo.logininfo.resFName: ' + logininfo.resFName);
    
    return {
        type: 'SET_LOGININFO',
        logininfo
    };
}

