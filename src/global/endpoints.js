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
			'/employee/' + payload
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
	ranks: function(payload){
		return(
		baseURL.activeCompany() +
		'/policies/ranks'
		)
 	}
}

export let mock = {
	employee: {
		list: 'http://www.mocky.io/v2/5a7be5f2300000982828c02a',
		allInfo: 'http://www.mocky.io/v2/5a7c17af2e0000600005274f'
	},
	policies: {
		ranks: 'http://www.mocky.io/v2/5a7d50b83100002b00cd0811'
	}
}