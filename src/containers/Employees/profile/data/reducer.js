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
				value: "-",
				options: ["-", "Male", "Female"]
			},
			civilstatus: {
				value: "-",
				options: ["-", "Single", "Married", "Divorced", "Separated", "Widowed"]
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
		case actionTypes.UPDATE_ALLINFO:
			return action.payload;
			break;
		
		case actionTypes.UPDATE_PERSONALINFO:
			return {
				...state.personalinfo,
				...action.payload
			}
			break;

		case actionTypes.UPDATE_BASICINFO:
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

		case actionTypes.UPDATE_CONTACTINFO:
			oState.personalinfo.contactinfo.mobile = action.payload.mobile;
			oState.personalinfo.contactinfo.telephone = action.payload.telephone;
			oState.personalinfo.contactinfo.email = action.payload.email;
			return {
				...oState
			}
			break;
		
		case actionTypes.UPDATE_IDS:
			oState.personalinfo.ids.tin.value = action.payload.tin;
			oState.personalinfo.ids.sss.value = action.payload.sss;
			oState.personalinfo.ids.philhealth.value = action.payload.philhealth;
			oState.personalinfo.ids.pagibig.value = action.payload.pagibig;
			return {
				...oState
			}
			break;
		
		case actionTypes.UPDATE_ADDRESS:
			return {
				...state.personalinfo.address,
				...action.payload
			}
			break;
		
		case actionTypes.UPDATE_DEPENDENTS:
			return {
				...state.personalinfo.de,
				...action.payload
			}
			break;

		case actionTypes.EMPTY:
			return action.payload;
			break;

		default:
			return state;
	}
};

export const status = (state = initialStatus, action) => {
	switch (action.type) {
		case actionTypes.UPDATE_STATUS:
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