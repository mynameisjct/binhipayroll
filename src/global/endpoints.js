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

export let newBaseURL = {
	activeCompany: function(){
		return(
		'company/' + getActiveCompany()
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
	list: function(){
		return(
			baseURL.activeCompany() + '/employee/info'
		)
	},

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
		},

		basicinfo: {
			update: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/' + payload.id +
					'/personalinfo/' + 'basicinfo'
				)
			}
		},

		address: {
			update: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/' + payload.id +
					'/personalinfo/' + 'address'
				)
			}
		},

		family: {
			update: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/' + payload.id +
					'/personalinfo/' + 'family'
				)
			}
		},
	},

	bankinfo: {
		update: function(payload){
			return(
				baseURL.activeCompany() +
				'/employee/'  + payload.id + 
				'/bankinfo'
			)
		}
	},

	employmentinfo: {
		workshift: {
			add: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/workshift/'
				)
			},
			update: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/workshift/' + payload.id
				)
			},
			delete: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/workshift/' + payload.id
				)
			}
		},
		benefits: {
			add: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/benefits/'
				)
			},
			delete: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/benefits/' + payload.id
				)
			},
			request: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/benefits/request'
				)
			}
		},
		
		rank: {
			add: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/ranks/'
				)
			},
			update: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/ranks/' + payload.rank.data.id
				)
			},
			delete: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/ranks/' + payload.id
				)
			}
		},

		details: {
			add: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/details/'
				)
			},
			update: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/details/' + payload.employmentinfo.details.id
				)
			},
			delete: function(payload){
				return(
					baseURL.activeCompany() +
					'/employee/'  + payload.employeeId + 
					'/employmentinfo/details/' + payload.id
				)
			}
		}

	},
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
	},
	
	positions: {
		get: function(payload){
			return(
				baseURL.activeCompany() +
				'/position'
			)
		},
	},

	savings: {
		get: function(payload){
			return(
				newBaseURL.activeCompany() +
				'/policy/employeesavings/'
			)
		},

		update: function(payload){
			return(
				newBaseURL.activeCompany() +
				'/policy/employeesavings/'
			)
		}
	}
}

export let reports = {
	dtr: {
		get: function(payload){
			return(
				baseURL.activeCompany() +
				'/employee/'  + payload.employeeid + 
				'/reports/dtr/' + payload.payrollid
			)
		},

		update: function(payload){
			return(
				baseURL.activeCompany() +
				'/employee/'  + payload.employeeid + 
				'/reports/dtr/'
			)
		},
	}
}

export let transactions = {
	payrollList:{
		get: function(payload){
			return(
				'payrollschedule/currentandprevious?filter=COMPANY&'+
				'id=' + getActiveCompany()
			)
		},

		update: function(payload){
			return(
				policy.ranks.get() + 
				payload.data.id
			)
		}
	},

	payroll:{
		generate: function(payload){
			return(
				'payrolltransaction/' +
				payload
			)
		}
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