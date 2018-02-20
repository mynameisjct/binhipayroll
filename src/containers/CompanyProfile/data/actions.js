import * as api from './api';
import * as actionTypes from './actionTypes';
import  { CONSTANTS } from '../../../constants';

export const getBranches = payload => 
    dispatch => {
        let objRes = {};
        dispatch(updateBranchStatus(CONSTANTS.STATUS.LOADING));
        
        api.getBranches(payload)
        .then((response) => response.json())
        .then((res) => {
            console.log('RES: ' + JSON.stringify(res))
            if(res.flagno == 1){
                dispatch(updateBranch(res.data));
            }
            objRes = {...res}
        })
        .then(() => {
            dispatch(updateBranchStatus([
                objRes.flagno || 0, 
                objRes.message || CONSTANTS.ERROR.SERVER
            ]));
        })
        .catch((exception) => {
            dispatch(updateBranchStatus([
                0, 
                exception.message + '.'
            ]));
            console.log('exception: ' + exception.message);
        });
}

export const updateBranch = payload =>  ({
    type: actionTypes.BRANCH.UPDATE.DATA,
	payload
});

export const updateBranchStatus = (payload) => ({
    type: actionTypes.BRANCH.UPDATE.STATUS,
	payload
});
