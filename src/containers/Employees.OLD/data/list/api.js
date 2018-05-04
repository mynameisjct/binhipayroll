
import { fetchApi, mockFetch } from '../../../../services/api';
import * as blackOps from '../../../../global/blackOps';
import * as endPoints from '../../../../global/endpoints';

const endPointsTemp = {
	get: 'user/17/company/17/employee/info',
};

/* export const get = payload => fetchApi(endPoints.get, payload, 'get'); */
export let get = payload => {
	if(blackOps.mode){
		return mockFetch(endPoints.mock.employee.list, {}, 'get');
	}
	else{
		return fetchApi(endPoints.employee.list(), payload, 'get');
	}
}
