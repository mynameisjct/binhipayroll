import { Buffer } from 'buffer';
import { fetchApi, mockFetch } from '../../services/api';
import apiConfig from '../../services/api/config';

const endPoints = {
	authenticate: '/users/auth',
	revoke: '/users/auth/revoke',
	//Not utilized for initial backend implmentation
	/* refresh: '/users/auth/refresh' */

	//MOCK
	/* authenticate: 'http://www.mocky.io/v2/5ae94d832d0000d4077b4abf',
	revoke: 'http://www.mocky.io/v2/5ae9570b2d00005d007b4af5' */
};

export const authenticate = (username, password, payload) => fetchApi(endPoints.authenticate, payload, 'post', {
	Authorization: `Basic ${new Buffer(`${username}:${password}`).toString('base64')}`
});

export const revoke = tokens => fetchApi(endPoints.revoke, { tokens }, 'post');

//Not utilized for initial backend implmentation
/* export const refresh = (token, user) => fetchApi(endPoints.refresh, { token, user }, 'post', {
	'Client-ID': apiConfig.clientId,
	Authorization: null,
});  
 */