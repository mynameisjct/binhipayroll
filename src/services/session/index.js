import {store} from '../../store';

import * as api from './api';
import * as selectors from './selectors';
import * as actionCreators from './actions';
import { initialState } from './reducer';
import * as oHelper from '../../helper';

const SESSION_TIMEOUT_THRESHOLD = 300; // Will refresh the access token 5 minutes before it expires

let sessionTimeout = null;

const setSessionTimeout = (duration) => {
	clearTimeout(sessionTimeout);
	sessionTimeout = setTimeout(
		refreshToken, // eslint-disable-line no-use-before-define
		(duration - SESSION_TIMEOUT_THRESHOLD) * 1000
	);
};

export const clearSession = () => {
	/* clearTimeout(sessionTimeout); */
	store.dispatch(actionCreators.update(initialState));
};

export const onRequestSuccess = async(response) => {
	let session = await oHelper.copyObject(selectors.get());
	console.log('session: ' + JSON.stringify(session));
	//V1-Manual Format
	session.tokens.access.type = 'access';
	session.tokens.access.value = response.access_token;
	session.user.id = response.userid;
	store.dispatch(actionCreators.update(session));
	/* setSessionTimeout(tokens.access.expiresIn); */
};

export const onRequestFailed = (exception) => clearSession();

export const refreshToken = () => {
	const session = selectors.get();

	if (!session.tokens.refresh.value || !session.user.id) {
		return Promise.reject();
	}

	return api.refresh(session.tokens.refresh, session.user)
	.then(onRequestSuccess)
	.catch(onRequestFailed);
};

export const authenticate = (username, password, payload) =>
	api.authenticate(username, password, payload)
	.then((response)=> response.json());

export const revoke = () => {
	const session = selectors.get();
	return api.revoke(Object.keys(session.tokens).map(tokenKey => ({
		type: session.tokens[tokenKey].type,
		value: session.tokens[tokenKey].value,
	})))
	.then((response)=> response.json());
};
