import { combineReducers } from 'redux';
import * as actionTypes from './actionTypes';
import { CONSTANTS } from '../../../../constants';
import * as oHelper from '../../../../helper';

const initialStatus = CONSTANTS.STATUS.LOADING;
const initialState = {
	id: '421',
	personalinfo:{
		basicinfo:{
			title: "BASIC INFORMATION",
			firstname: "FNAME_TEST",
			middlename: "MNAME_TEST",
			lastname: "LNAME_TEST",
			nickname: "NNAME_TEST",
			birthdate: {
				value: '1990-01-01',
				format: "MMMM DD, YYYY"
			},
			gender: {
				value: "Male",
				options: ["-", "Male", "Female"]
			},
			civilstatus: {
				value: "Single",
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
					id: "1043",
					value: ""
				},
				city: {
					label: "City",
					id: "104307",
					value: ""
				},
				barangay: {
					label: "Barangay",
					id: "104307008",
					value: ""
				},
				street: {
					label: "street",
					value: "K"
				}
			},
	
			permanent:{
				title: "PERMANENT ADDRESS",
				province: {
					label: "Province",
					id: "1043",
					value: ""
				},
				city: {
					label: "City",
					id: "104307",
					value: ""
				},
				barangay: {
					label: "Barangay",
					id: "104307008",
					value: ""
				},
				street: {
					label: "street",
					value: "nj"
				}
			}
		},

		family: {
			spouse: {
				title: "SPOUSE",
				name: "SPOUSE_NAME",
				birthdate: {
					value: '1980-01-01',
					format: "MMMM DD, YYYY"
				},
				work:{
					jobtitle:"SPOUSE_jobtitle_TEST",
					company:"SPOUSE_company_TEST"
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
			employmenttype: '',
			datehired:{
				value: null,
				format: "MMMM DD, YYYY"
			},
			dateend: {
				value: null,
				format: "MMMM DD, YYYY"
			},
			data: []
			/* data: [  
				{  
				   "id":"",
				   "index":1,
				   "position":{  
					  "label":"Pos2",
					  "value":"Pos2"
				   },
				   "branch":{  
					  "label":"Branch2",
					  "value":"Branch2"
				   },
				   "effectivedate":{  
					  "from":{  
						 "value":"2018-06-13",
						 "format":"MMMM DD, YYYY"
					  },
					  "to":{  
						 "value":"PRESENT",
						 "format":"MMMM DD, YYYY"
					  }
				   },
				   "remarks":"1"
				},
				{  
				   "id":"",
				   "index":1,
				   "position":{  
					  "label":"Pos1",
					  "value":"Pos1"
				   },
				   "branch":{  
					  "label":"Branch1",
					  "value":"Branch1"
				   },
				   "effectivedate":{  
					  "from":{  
						 "value":"2018-02-28",
						 "format":"MMMM DD, YYYY"
					  },
					  "to":{  
						 "value":"2018-06-12",
						 "format":"MMMM DD, YYYY"
					  }
				   },
				   "remarks":"1"
				}
			] */
		},

		workshift: {
			title: "WORK SHIFT",
			data: [
				/* {
					id: "0001",
					workshiftid: "239",
					effectivedate: {
						from: {
							value: '2018-01-01',
							format: "MMM DD, YYYY"
						},
						to: {
							value: "2018-03-02",
							"format": "MMM DD, YYYY"
						}
					},
					remarks: ''
				},
				{
					id: "0002",
					workshiftid: "240",
					effectivedate: {
						from: {
							value: '2018-03-01',
							format: "MMM DD, YYYY"
						},
						to: {
							value: null,
							"format": "MMM DD, YYYY"
						}
					},
					remarks: ''
				} */
			]
		},

		benefits: {
			government: {
				title: 'GOVERNMENT BENEFITS',
				data: [
                    {
                        id: '0001',
						name: 'SSS',
						empsssid: '124567',
                        enabled: false,
                        effectivedate: {
                            from:{
                                value: '2017-01-01',
                                format: 'YYYY-MM-DD'
                            },
                            to:{
                                value: null,
                                format: 'YYYY-MM-DD'
                            }
                        }
                    },

                    {
                        id: '0002',
						name: 'PAGIBIG',
						empsssid: '124567',
                        enabled: true,
                        effectivedate: {
                            from:{
                                value: '2017-01-01',
                                format: 'YYYY-MM-DD'
                            },
                            to:{
                                value: null,
                                format: 'YYYY-MM-DD'
                            }
                        }
                    },


                    {
                        id: '0003',
						name: 'PHILHEALTH',
						empsssid: '124567',
                        enabled: false,
                        effectivedate: {
                            from:{
                                value: '2017-01-01',
                                format: 'YYYY-MM-DD'
                            },
                            to:{
                                value: null,
                                format: 'YYYY-MM-DD'
                            }
                        }
                    },
                ]
			},

			company: {
				title: 'COMPANY BENEFITS',
				data: [
					{
						id: '1234',
						benefitid: '0004',
						name: 'Clothing Allowance',
						amountpermonth: '200',
						scheme: {
							value: 'Last Pay of the Month',
							options: [
								'First Pay of the Month',
								'Last Pay of the Month'
							]
						},
						effectivedate: {
							from: {
								value: '2017-01-01',
								format: 'YYYY-MM-DD'
							},
							to: {
								value: null,
								format: 'YYYY-MM-DD'
							}
						}
					},
					{
						id: '5678',
						benefitid: '0005',
						name: 'Laundry Allowance',
						amountpermonth: '100',
						scheme: {
							value: 'Last Pay of the Month',
							options: [
								'First Pay of the Month',
								'Last Pay of the Month'
							]
						},
						effectivedate: {
							from: {
								value: '2017-01-01',
								format: 'YYYY-MM-DD'
							},
							to: {
								value: null,
								format: 'YYYY-MM-DD'
							}
						}
					},

					{
						id: '9101',
						benefitid: '0006',
						name: 'Management Allowance',
						amountpermonth: '300',
						scheme: {
							value: 'Last Pay of the Month',
							options: [
							'First Pay of the Month',
							'Last Pay of the Month'
							]
						},
						effectivedate: {
							from: {
								value: '2017-01-01',
								format: 'YYYY-MM-DD'
							},
							to: {
								value: null,
								format: 'YYYY-MM-DD'
							}
						}
						
					},
					{
						id: '1121',
						benefitid: '0007',
						name: 'Medical Allowance',
						amountpermonth: '100',
						scheme: {
							value: 'Last Pay of the Month',
							options: [
							'First Pay of the Month',
							'Last Pay of the Month'
							]
						},
						effectivedate: {
							from: {
								value: '2017-01-01',
								format: 'YYYY-MM-DD'
							},
							to: {
								value: null,
								format: 'YYYY-MM-DD'
							}
						}
						
					},
					{
						id: '3141',
						benefitid: '0008',
						name: 'Rice Alowance',
						amountpermonth: '250',
						scheme: {
							value: 'Last Pay of the Month',
							options: [
							'First Pay of the Month',
							'Last Pay of the Month'
							]
						},
						effectivedate: {
							from: {
								value: '2017-01-01',
								format: 'YYYY-MM-DD'
							},
							to: {
								value: null,
								format: 'YYYY-MM-DD'
							}
						}
					}
					
				]
			}
		},

		rank: {
			title: "EMPLOYEE RANK",
			data: [
				{
					id: "0001",
					rankid: "239",
					effectivedate: {
						from: {
							value: '2018-01-01',
							format: "MMM DD, YYYY"
						},
						to: {
							value: "2018-03-02",
							format: "MMM DD, YYYY"
						}
					},
					remarks: ''
				},
				{
					id: "0002",
					rankid: "240",
					effectivedate: {
						from: {
							value: '2018-03-01',
							format: "MMM DD, YYYY"
						},
						to: {
							value: null,
							"format": "MMM DD, YYYY"
						}
					},
					remarks: ''
				}
			]
		},
	},



	reports: {

	}
};


export const data = (state = initialState, action) => {
	let oState = JSON.parse(JSON.stringify(state));
	switch (action.type) {
		case actionTypes.ALLINFO.UPDATE.ID:
			oState.id = action.payload;
			return {
				...oState
			}
			break;

		case actionTypes.ALLINFO.UPDATE.DATA:
			oState.personalinfo = action.payload.employee.personalinfo;
			oState.bankinfo = action.payload.employee.bankinfo;
			oState.employmentinfo = action.payload.employee.employmentinfo;
			return {...oState};
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
			oState.personalinfo.address = action.payload.employee.address;
			oState.personalinfo.family = action.payload.employee.family;
			return {
				...oState
			}
			break;

		case actionTypes.BASICINFO.UPDATE.DATA:
			oState.personalinfo.basicinfo.firstname = action.payload.firstname;
			oState.personalinfo.basicinfo.middlename = action.payload.middlename;
			oState.personalinfo.basicinfo.lastname = action.payload.lastname;
			oState.personalinfo.basicinfo.nickname = action.payload.nickname;
			oState.personalinfo.basicinfo.birthdate.value = action.payload.birthdate;
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
			
			//Spouse
			oState.personalinfo.family.spouse.name = action.payload.spouse.name;
			oState.personalinfo.family.spouse.birthdate.value = 
				action.payload.spouse.birthdate ? 
					oHelper.convertDateToString(action.payload.spouse.birthdate, 'YYYY-MM-DD')
					:
					null;
			oState.personalinfo.family.spouse.work.jobtitle = action.payload.spouse.jobtitle;
			oState.personalinfo.family.spouse.work.company = action.payload.spouse.company;

			//Dependents
			oState.personalinfo.family.dependents.data = [...action.payload.dependents];

			return {
				...oState
			}
			break;

		case actionTypes.BANKINFO.UPDATE.DATA:
			oState.bankinfo.bankname = action.payload.bankname;
			oState.bankinfo.accountnumber = action.payload.accountnumber;
			return {
				...oState
			}
			break;
		
		case actionTypes.EMPLOYMENTDETAILS.UPDATE.DATA:
			oState.employmentinfo.details.employmenttype = action.payload.employmenttype;
			oState.employmentinfo.details.datehired = action.payload.datehired;
			oState.employmentinfo.details.dateend = action.payload.dateend;
			oState.employmentinfo.details.data = action.payload.data;

			return {
				...oState
			}
			break;

		case actionTypes.EMPLOYEEWORKSHIFT.UPDATE.DATA:
			oState.employmentinfo.workshift.data = action.payload;
			
			return {
				...oState
			}
			break;

		case actionTypes.EMPLOYEEBENEFITS.GOVERNMENT.UPDATE.DATA:
			oState.employmentinfo.benefits.government.data = action.payload;
			
			return {
				...oState
			}
			break;
		
		case actionTypes.EMPLOYEEBENEFITS.COMPANY.UPDATE.DATA:
			oState.employmentinfo.benefits.company.data = action.payload;
			
			return {
				...oState
			}
			break;

		case actionTypes.EMPLOYEERANK.UPDATE.DATA:
			oState.employmentinfo.rank.data = action.payload;
			
			return {
				...oState
			}
			break;

		case actionTypes.ALLINFO.REMOVE.ACTIVEDATA:
			return initialState;
			break;

		default:
			return state;
	}
};

export const status = (state = initialStatus, action) => {
	switch (action.type) {
		case actionTypes.ALLINFO.UPDATE.STATUS:
			return action.payload;
			break;

		default:
			return state;
	}
};

export const activeProfile = combineReducers({
    data,
	status
}); 