import { FETCH_HAS_ERRORED, FETCH_IS_LOADING } from '../constants';

export function fetchHasErrored(state = false, action) {
    switch (action.type) {
        case FETCH_HAS_ERRORED:
            return action.hasErrored;

        default:
            return state;
    }
}

export function fetchIsLoading(state = true, action) {
    switch (action.type) {
        case FETCH_IS_LOADING:
            return action.isLoading;

        default:
            return state;
    }
}

