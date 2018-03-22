import { fetchApi, mockFetch } from '../../../../services/api';
import * as blackOps from '../../../../global/blackOps';
import * as endPoints from '../../../../global/endpoints';

export const get = payload => fetchApi(endPoints.policy.positions.get(), payload, 'get');