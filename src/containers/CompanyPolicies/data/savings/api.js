import { fetchApi, mockFetch } from '../../../../services/api';
import * as endPoints from '../../../../global/endpoints';
import * as blackOps from '../../../../global/blackOps';

export let get = payload => fetchApi(endPoints.policy.savings.get(payload), payload, 'get');
export let update = payload => fetchApi(endPoints.policy.savings.update(payload), payload, 'put');