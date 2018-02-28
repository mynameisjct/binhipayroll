import {store} from '../store';
import { bankInfo } from '../containers/Employees/data/activeProfile/api';

export const getActiveUsername = () => {
	return store.getState().loginReducer.logininfo.resUsername;
};

export const getActiveCompany = () => {
	return store.getState().activeCompanyReducer.activecompany.id;
};

export let baseURL = {
	activeCompany: function(){
		return(
		'user/' + getActiveUsername() +
		'/company/' + getActiveCompany()
		)
 	}
}

export let company = {
	branch: function(payload){
		return(
			baseURL.activeCompany() +
			'/branch'
		)
	}
}

export let employee = {
	allInfo: function(payload){
		return(
			baseURL.activeCompany() +
			'/employee/' + payload + '/'
		)
	 },
	
	//Deprecated
	basicInfo: function(payload){
		return(
			baseURL.activeCompany() + 
			'/employee/' + payload + 
			'/personalinfo/basicinfo'
		)
	 },
	 
	personalinfo: {
		create: function(){
			return(
				baseURL.activeCompany() +
				'/employee/personalinfo'
			)
		}
	},

	bankinfo: {
		update: function(payload){
			return(
				baseURL.activeCompany() +
				'/employee/'  + payload.id + 
				'/bankinfo'
			)
		}
	}
}

export let policy = {
	ranks: {
		get: function(payload){
			return(
				baseURL.activeCompany() +
				'/policies/ranks/'
			)
		},

		create: function(payload){
			return(
				policy.ranks.get()
			)
		},

		remove: function(payload){
			return(
				policy.ranks.get() + 
				payload.data.id
			)
		},

		update: function(payload){
			return(
				policy.ranks.get() + 
				payload.data.id
			)
		},
 	}
}

export let mock = {
	company: {
		branch: 'http://www.mocky.io/v2/5a8bd883320000f92c1ac015'
	},
	employee: {
		list: 'http://www.mocky.io/v2/5a7be5f2300000982828c02a',
		allInfo2: 'http://www.mocky.io/v2/5a8e85142f000056004f26ca',
		allInfo1: 'http://www.mocky.io/v2/5a8e852b2f000048004f26cb',
	},
	policies: {
		ranks: 'http://www.mocky.io/v2/5a7d50b83100002b00cd0811'
	}
}