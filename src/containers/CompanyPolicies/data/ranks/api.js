import { fetchApi } from '../../../../services/api';
import * as endPoints from '../../../../global/endpoints';

export const get = payload => fetchApi(endPoints.policy.ranks(payload), payload, 'get');

export const update = payload => fetchApi(endPoints.update, payload, 'post');
