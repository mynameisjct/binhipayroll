import { fetchApi, mockFetch } from '../../../services/api';
import * as endPoints from'../../../global/endpoints';
import * as blackOps from '../../../global/blackOps';

export let get = payload => fetchApi(endPoints.reports.dtr.get(payload), payload, 'get');
/* export let update = payload => fetchApi(endPoints.reports.dtr.update(payload), payload, 'post');
 */

export let update = payload => mockFetch('http://www.mocky.io/v2/5aed09803200002900fa4a5c', payload, 'post');