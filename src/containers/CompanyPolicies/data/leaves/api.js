import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/leaves.php',
	get: 'forms/leaves.php'
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

