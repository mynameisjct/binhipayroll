
import { fetchApi } from '../../../../services/api';

const endPoints = {
	get: 'user/17/company/17/employee/info',
};

export const get = payload => fetchApi(endPoints.get, payload, 'get');


