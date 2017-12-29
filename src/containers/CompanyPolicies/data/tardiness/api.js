import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/tardiness.php',
	get: 'forms/tardiness.php',
	remove: 'forms/tardiness.php',
	toggleSwitch: 'forms/tardiness.php'
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const toggleSwitch = payload => fetchApi(endPoints.toggleSwitch, payload, 'post');

export const remove = payload => fetchApi(endPoints.remove, payload, 'post');
