import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';

const initialState = {
	personalinfo:{
		basicinfo:{
			title: "BASIC INFORMATION",
			firstname: "",
			middlename: "",
			lastname: "",
			nickname: "",
			birthday: "06/01/1990",
			gender: {
				value: "",
				options: ["-", "Male", "Female"]
			},
			civilstatus: {
				value: "",
				options: ["", "Single", "Married", "Divorced", "Separated", "Widowed"]
			}
		},
		contactinfo:{
			title: "CONTACT INFORMATION",
			mobile: [],
			telephone: [],
			email: []
		},
		ids: {
			title: "GOVERNMENT IDS",
			tin: {
				label: "Personal TIN",
				value: ""
			},
			sss: {
				label: "SSS No.",
				value: ""
			},
			philhealth: {
				label: "Phil Health No.",
				value: ""
			},
			pagibig: {
				label: "Pag - IBI No.",
				value: ""
			}
		},

		address: {
			present:{
				title: "PRESENT ADDRESS",
				province: {
					label: "Province",
					id: "",
					value: ""
				},
				city: {
					label: "City",
					id: "",
					value: ""
				},
				barangay: {
					label: "Barangay",
					id: "",
					value: ""
				},
				street: {
					label: "street",
					value: ""
				}
			},
	
			permanent:{
				title: "PERMANENT ADDRESS",
				province: {
					label: "Province",
					id: "",
					value: ""
				},
				city: {
					label: "City",
					id: "011",
					value: ""
				},
				barangay: {
					label: "Barangay",
					id: "",
					value: ""
				},
				street: {
					label: "street",
					value: ""
				}
			}
		},

		family: {
			spouse: {
				title: "SPOUSE",
				name: "",
				work:{
					jobtitle:"",
					company:""
				}
			},

			dependents: {
				title: "DEPENDENTS",
				data: []
			}
		}
	},
	
	bankinfo: {
		title: "BANK ACCOUNT INFORMATION",
		bankname: "",
		accountnumber: ""
	},

	employmentinfo: {
		details:{
			title: "EMPLOYMENT DETAILS",
			employmenttype: "Regular",
			datehired: "06/01/2016",
			dateend: "-",
			data: []
		},

		workshift: {
			title: "WORK SHIFT",
			data: []
		}
	}
};

const initialStatus = 2;

export const employee = (state = initialState, action) => {
	let oState = {...state};
	switch (action.type) {
		case actionTypes.ALLINFO.UPDATE.DATA:
			return action.payload;
			break;
		
		case actionTypes.PERSONALINFO.UPDATE.DATA:
			oState.personalinfo = action.payload;

			return {
				...oState
			}
			break;

		case actionTypes.BASICINFO.INIT.DATA:
			oState.personalinfo.basicinfo = action.payload.employee.basicinfo;
			oState.personalinfo.contactinfo = action.payload.employee.contactinfo;
			oState.personalinfo.ids = action.payload.employee.ids;
			return {
				...oState
			}
			break;

		case actionTypes.BASICINFO.UPDATE.DATA:
			oState.personalinfo.basicinfo.firstname = action.payload.firstname;
			oState.personalinfo.basicinfo.middlename = action.payload.middlename;
			oState.personalinfo.basicinfo.lastname = action.payload.lastname;
			oState.personalinfo.basicinfo.nickname = action.payload.nickname;
			oState.personalinfo.basicinfo.birthday = action.payload.birthday;
			oState.personalinfo.basicinfo.gender.value = action.payload.gender;
			oState.personalinfo.basicinfo.civilstatus.value = action.payload.civilstatus;
			return {
				...oState
			}
			break;

		case actionTypes.CONTACTINFO.UPDATE.DATA:
			oState.personalinfo.contactinfo.mobile = action.payload.mobile;
			oState.personalinfo.contactinfo.telephone = action.payload.telephone;
			oState.personalinfo.contactinfo.email = action.payload.email;
			return {
				...oState
			}
			break;
		
		case actionTypes.IDS.UPDATE.DATA:
			oState.personalinfo.ids.tin.value = action.payload.tin;
			oState.personalinfo.ids.sss.value = action.payload.sss;
			oState.personalinfo.ids.philhealth.value = action.payload.philhealth;
			oState.personalinfo.ids.pagibig.value = action.payload.pagibig;
			return {
				...oState
			}
			break;
		
		case actionTypes.ADDRESS.UPDATE.DATA:
			oState.personalinfo.address.present.province.id = action.payload.present.province;
			oState.personalinfo.address.present.city.id = action.payload.present.city;
			oState.personalinfo.address.present.barangay.id = action.payload.present.barangay;
			oState.personalinfo.address.present.street.value = action.payload.present.street;

			oState.personalinfo.address.permanent.province.id = action.payload.permanent.province;
			oState.personalinfo.address.permanent.city.id = action.payload.permanent.city;
			oState.personalinfo.address.permanent.barangay.id = action.payload.permanent.barangay;
			oState.personalinfo.address.permanent.street.value = action.payload.permanent.street;
			return {
				...oState
			}
			break;
		
		case actionTypes.DEPENDENTS.UPDATE.DATA:
			return {
				...state.personalinfo.dependents,
				...action.payload
			}
			break;

		case actionTypes.BANKINFO.UPDATE.DATA:
			oState.bankinfo.bankname = action.payload.bankname;
			oState.bankinfo.accountnumber = action.payload.accountnumber;
			return {
				...oState
			}
			break;

		case actionTypes.EMPTY:
			return initialState;
			break;

		default:
			return state;
	}
};

export const status = (state = initialStatus, action) => {
	switch (action.type) {
		case actionTypes.ALLINFO.BANKINFO:
			return action.payload;
			break;

		default:
			return state;
	}
};

export const employeeProfile = combineReducers({
    employee,
    status
});