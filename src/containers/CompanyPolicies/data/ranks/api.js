import { fetchApi, mockFetch } from '../../../../services/api';
import * as endPoints from '../../../../global/endpoints';
import * as blackOps from '../../../../global/blackOps';

export let get = payload => {
	if(blackOps.mode){
		return mockFetch(endPoints.mock.policies.ranks, {}, 'get');
	}
	else{
		return fetchApi(endPoints.policy.ranks.get(payload), payload, 'get');
	}
}

export let update = payload => fetchApi(endPoints.policy.ranks.update(payload), payload, 'put');
export let create = payload => fetchApi(endPoints.policy.ranks.create({id: ''}), payload, 'post');
export let remove = payload => fetchApi(endPoints.policy.ranks.remove(payload), payload, 'delete');