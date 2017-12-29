import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/timepolicies/undertime.php',
	get: 'forms/timepolicies/undertime.php',
	remove: 'forms/timepolicies/undertime.php',
	toggleSwitch: 'forms/timepolicies/undertime.php'
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const toggleSwitch = payload => fetchApi(endPoints.toggleSwitch, payload, 'post');

export const remove = payload => fetchApi(endPoints.remove, payload, 'post');
