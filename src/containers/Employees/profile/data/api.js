import { fetchApi } from '../../../../services/api';
import * as endPoints from '../../../../global/endpoints';

const addressEndPoints = {
	create: 'forms/benefits/bonus.php',
	get: 'forms/benefits/bonus.php',
	update: 'forms/benefits/bonus.php',
	remove: 'forms/benefits/bonus.php',

	provinces: 'address/province/',
	cities: '/city/',
	barangays: '/barangay/',
};

export const getBasicInfo = payload => fetchApi(endPoints.employee.basicInfo(payload), {}, 'get');
/* 
export const update = payload => fetchApi(endPoints.get, payload, 'post');

export const remove = payload => fetchApi(endPoints.remove, payload, 'post');
 */
//Address API
export const getProvinces = payload => fetchApi(
	addressEndPoints.provinces, 
	undefined,
	'get'
);

export const getCities = payload => fetchApi(
	addressEndPoints.provinces + 
	payload.province + 
	addressEndPoints.cities, 
	undefined,
	'get');

export const getBarangays = payload => fetchApi(
	addressEndPoints.provinces + 
	payload.province + 
	addressEndPoints.cities + 
	payload.city +
	addressEndPoints.barangays,
	undefined,
	'get');


