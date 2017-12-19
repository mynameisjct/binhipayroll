import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/payrollpolicies.php',
	get: 'forms/payrollpolicies.php',
	changeRequest: 'forms/payrollpolicies.php',
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const remove = payload => fetchApi(endPoints.remove, payload, 'post');

export const changeRequest = payload => fetchApi(endPoints.changeRequest, payload, 'post');

export const update = payload => fetchApi(endPoints.changeRequest, payload, 'post');

