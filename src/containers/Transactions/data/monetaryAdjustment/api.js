import { fetchApi, mockFetch } from '../../../../services/api';
import * as endPoints from'../../../../global/endpoints';
import * as blackOps from '../../../../global/blackOps';

export let get = payload => fetchApi(endPoints.transactions.payrollList.get(payload), payload, 'get');
export let update = payload => fetchApi(endPoints.transactions.payrollList.update(payload), payload, 'put');