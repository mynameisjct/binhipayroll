import {store} from '../store';

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

export let employee = {
	allInfo: function(payload){
		return(
			baseURL.activeCompany() +
			'/employee/' + payload + '/'
		)
	 },
	 
	basicInfo: function(payload){
		return(
			baseURL.activeCompany() + 
			'/employee/' + payload + 
			'/personalinfo/basicinfo'
		)
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
	employee: {
		list: 'http://www.mocky.io/v2/5a7be5f2300000982828c02a',
		allInfo2: 'http://www.mocky.io/v2/5a7c17af2e0000600005274f',
		allInfo1: 'http://www.mocky.io/v2/5a825d762f00005800718eba',
	},
	policies: {
		ranks: 'http://www.mocky.io/v2/5a7d50b83100002b00cd0811'
	}
}