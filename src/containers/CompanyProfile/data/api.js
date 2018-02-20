import { fetchApi, mockFetch } from '../../../services/api';
import * as blackOps from '../../../global/blackOps';
import * as endPoints from '../../../global/endpoints';

export let getBranches = payload => {
	if(blackOps.mode){
		return mockFetch(endPoints.mock.company.branch, {}, 'get');
	}
	else{
		return fetchApi(endPoints.company.branch(payload), {}, 'get');
	}
}