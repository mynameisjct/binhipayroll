import { fetchApi, mockFetch } from '../../../../services/api';
import * as endPoints from'../../../../global/endpoints';
import * as blackOps from '../../../../global/blackOps';

export let get = payload => fetchApi(endPoints.reports.payrollSchedule.get(payload), payload, 'get');