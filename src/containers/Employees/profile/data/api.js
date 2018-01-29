import { fetchApi } from '../../../../services/api';

const endPoints = {
	create: 'forms/benefits/bonus.php',
	get: 'forms/benefits/bonus.php',
	update: 'forms/benefits/bonus.php',
	remove: 'forms/benefits/bonus.php',

	provinces: 'address/province/',
	cities: '/city/',
	barangays: '/barangay/',
};

export const create = payload => fetchApi(endPoints.create, payload, 'post');

export const get = payload => fetchApi(endPoints.get, payload, 'post');

export const update = payload => fetchApi(endPoints.get, payload, 'post');

export const remove = payload => fetchApi(endPoints.remove, payload, 'post');

//Address API
export const getProvinces = payload => fetchApi(
	endPoints.provinces, 
	undefined,
	'get'
);

export const getCities = payload => fetchApi(
	endPoints.provinces + 
	payload.province + 
	endPoints.cities, 
	undefined,
	'get');

export const getBarangays = payload => fetchApi(
	endPoints.provinces + 
	payload.province + 
	endPoints.cities + 
	payload.city +
	endPoints.barangays,
	undefined,
	'get');


