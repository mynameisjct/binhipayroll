import { fetchApi, mockFetch } from '../../../../services/api';
import * as endPoints from'../../../../global/endpoints';
import * as blackOps from '../../../../global/blackOps';

export let get = payload => fetchApi(endPoints.transactions.monetaryAdjustment.get(payload), payload, 'get');
export let update = payload => fetchApi(endPoints.transactions.monetaryAdjustment.update(payload), payload, 'post');
export let create = payload => fetchApi(endPoints.transactions.monetaryAdjustment.create(payload), payload, 'post');