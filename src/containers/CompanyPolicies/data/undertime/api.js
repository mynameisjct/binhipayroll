import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/undertime.php',
	get: 'forms/undertime.php',
	remove: 'forms/undertime.php'
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const remove = payload => fetchApi(endPoints.remove, payload, 'post');
