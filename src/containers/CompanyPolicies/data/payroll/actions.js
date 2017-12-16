import * as api from './api';
import * as actionTypes from './actionTypes';

const update = payload => ({
	type: actionTypes.UPDATE,
	payload
});

export const empty = () => ({
	type: actionTypes.EMPTY,
});

export const get = payload => 
	dispatch =>
		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			console.log('INPUT: ' + JSON.stringify(payload));
			console.log('OUTPUT: ' + JSON.stringify(res));
			dispatch(update(res));
		});

const tempData = {
	_payrolldata: {
		paytype:{
				value: "Semi-Monthly",
				options: ["Semi-Monthly","Monthly","Weekly"]
		},
		data:{
			semimonthly:{
				firstpayday:{
					value: "15",
					options: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
				},

				secondpayday:{
					value:"30"
				},

				cutoff:{
					value:"5",
					options:["0","1","2","3","4","5","6","7","8","9","10"]
				},

				firstperiod:{
					value:"25-09"
				},

				secondperiod:{
					value:"10-24"
				}
			},

			monthly:{
				payday:{
					value: "30",
					options: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"]
				},
				cutoff:{
					value:"5",
					options:["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"]
				},
				period:{
					value:"25-26"
				},
			},

			weekly:{
				payday:{
					value: "Friday",
					options: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
				},
				cutoff:{
					value:"Wednesday",
					options:["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
				},
				period:{
					value:"Thursday-Wednesday"
				},
			}, 
		}
	}
}