import { fetchApi, mockFetch } from '../../../../services/api';
import * as endPoints from'../../../../global/endpoints';
import * as blackOps from '../../../../global/blackOps';

export let get = payload => fetchApi(endPoints.transactions.payroll.get(payload), payload, 'get');
export let update = payload => fetchApi(endPoints.transactions.payroll.update(payload), payload, 'put');