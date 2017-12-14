import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/workschedule.php',
	get: 'forms/workschedule.php',
	remove: 'forms/workschedule.php'
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const remove = payload => fetchApi(endPoints.remove, payload, 'post');
