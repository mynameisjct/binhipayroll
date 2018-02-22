import { fetchApi, mockFetch } from '../../../../services/api';
import * as blackOps from '../../../../global/blackOps';
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


export let getBasicInfo = payload => {
	if(blackOps.mode){
		return fetchApi(endPoints.employee.basicInfo(payload), {}, 'get');
	}
	else{
		return fetchApi(endPoints.employee.basicInfo(payload), {}, 'get');
	}
}

export let getAllInfo = payload => {
	if(blackOps.mode){
		if(payload == 1){
			return mockFetch(endPoints.mock.employee.allInfo1, {}, 'get');
		}
		else{
			return mockFetch(endPoints.mock.employee.allInfo2, {}, 'get');
		}
		
	}
	else{
		return fetchApi(endPoints.employee.allInfo(payload), {}, 'get');
	}
}

export let createPersonalInfo = payload => {
	return fetchApi(endPoints.employee.personalinfo.create(), payload, 'post');
}

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


