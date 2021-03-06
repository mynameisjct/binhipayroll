import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/timepolicies/leavepolicies.php',
	get: 'forms/timepolicies/leavepolicies.php',
	toggleSwitch: 'forms/timepolicies/leavepolicies.php',
	remove: 'forms/timepolicies/leavepolicies.php',
	updateExpiry: 'forms/timepolicies/leavepolicies.php'
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const toggleSwitch = payload => fetchApi(endPoints.toggleSwitch, payload, 'post');

export const remove = payload => fetchApi(endPoints.remove, payload, 'post');

export const updateExpiry = payload => fetchApi(endPoints.updateExpiry, payload, 'post');
