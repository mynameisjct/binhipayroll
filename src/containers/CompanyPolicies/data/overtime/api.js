import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/overtime.php',
	get: 'forms/overtime.php'
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

