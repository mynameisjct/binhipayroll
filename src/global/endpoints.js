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
	basicInfo: function(payload){
		return(
		'user/' + getActiveUsername() + 
		'/company/' + getActiveCompany() + 
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