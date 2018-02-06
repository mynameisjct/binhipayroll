
import { fetchApi, mockFetch } from '../../../../services/api';

const endPoints = {
	get: 'user/17/company/17/employee/info',
};

const mockEndPoint = {
	get: 'http://www.mocky.io/v2/5a793b902f00000f00669150'
}

export const get = payload => fetchApi(endPoints.get, payload, 'get');
/* export const get = payload => mockFetch(mockEndPoint.get, payload, 'get'); */
