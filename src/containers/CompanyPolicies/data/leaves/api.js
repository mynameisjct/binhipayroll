import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/timepolicies/leavepolicies.php',
	get: 'forms/timepolicies/leavepolicies.php'
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

