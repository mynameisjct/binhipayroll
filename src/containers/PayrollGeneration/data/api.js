import { fetchApi, mockFetch } from '../../../services/api';
import * as endPoints from'../../../global/endpoints';
import * as blackOps from '../../../global/blackOps';

export let generate = payload => fetchApi(endPoints.transactions.payroll.generate(payload), payload, 'post');