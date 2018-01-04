import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/overtimepolicies.php',
	get: 'forms/overtimepolicies.php',
	toggleSwitch: 'forms/overtimepolicies.php',
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const toggleSwitch = payload => fetchApi(endPoints.toggleSwitch, payload, 'post');

