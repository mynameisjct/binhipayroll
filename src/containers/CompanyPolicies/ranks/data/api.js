import { fetchApi } from '../../../../services/api';

const endPoints = {
	get: 'forms/withholding.php',
	update: 'forms/withholding.php'
};

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const update = payload => fetchApi(endPoints.update, payload, 'post');
