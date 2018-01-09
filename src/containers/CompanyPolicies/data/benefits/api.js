import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/benefits/benefits.php',
	get: 'forms/benefits/benefits.php',
	toggleSwitch: 'forms/benefits/benefits.php',
	remove: 'forms/benefits/benefits.php',
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const toggleSwitch = payload => fetchApi(endPoints.toggleSwitch, payload, 'post');

export const remove = payload => fetchApi(endPoints.remove, payload, 'post');


