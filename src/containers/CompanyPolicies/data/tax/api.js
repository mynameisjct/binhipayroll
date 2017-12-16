import { fetchApi } from '../../../../services/api';

const endPoints = {
	get: 'forms/withholding.php',
};

export const get = payload => fetchApi(endPoints.get, payload, 'post');
