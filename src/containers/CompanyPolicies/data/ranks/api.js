import { fetchApi, mockFetch } from '../../../../services/api';
import * as endPoints from '../../../../global/endpoints';
import * as blackOps from '../../../../global/blackOps';

export const update = payload => fetchApi(endPoints.update, payload, 'post');

export let get = payload => {
	if(blackOps.mode){
		return mockFetch(endPoints.mock.policies.ranks, {}, 'get');
	}
	else{
		return fetchApi(endPoints.policy.ranks(payload), payload, 'get');
	}
}