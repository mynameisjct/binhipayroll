import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/benefits/bonus.php',
	get: 'forms/benefits/bonus.php',
	toggleSwitch: 'forms/benefits/bonus.php',
	remove: 'forms/benefits/bonus.php',
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const toggleSwitch = payload => fetchApi(endPoints.toggleSwitch, payload, 'post');

export const remove = payload => fetchApi(endPoints.remove, payload, 'post');


