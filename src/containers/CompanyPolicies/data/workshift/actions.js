/* import * as api from './api';
import * as actionTypes from './actionTypes';

const update = items => ({
	type: actionTypes.UPDATE,
	items,
});

export const empty = () => ({
	type: actionTypes.EMPTY,
});

export const get = payload =>
	dispatch =>
		api.get(payload)
		.then(response => dispatch(update(response.users))); */

import * as api from './api';
import * as actionTypes from './actionTypes';

const update = companyworkshift => ({
	type: actionTypes.UPDATE,
	companyworkshift,
});

export const empty = () => ({
	type: actionTypes.EMPTY,
});

export const remove = () => ({
	type: actionTypes.REMOVE,
});

export const get = payload => 
	dispatch =>
		api.get(payload)
		.then((response) => response.json())
		.then((res) => {
			dispatch(update(res));
		});


/* export const WorkShiftHasErrored = () => ({
	type: WORKSHIFT_HAS_ERRORED,
	hasErrored: bool
})

export const WorkShiftIsLoading(bool) {
    return {
        type: WORKSHIFT_IS_LOADING,
        isLoading: bool
    };
}
*/