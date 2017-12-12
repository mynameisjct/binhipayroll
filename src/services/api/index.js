import apiConfig from './config';

export const fetchApi = (endPoint, payload = {}, strMethod = 'post', headers = {}) => {
    return fetch(apiConfig.url + endPoint,{
        method: strMethod,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(
            payload
        )
    })
	.catch((e) => {
		if (e.response && e.response.json) {
			e.response.json().then((json) => {
				if (json) throw json;
				throw e;
            });
            console.log("TEST_TRUE");
		} else {
            throw e;
            console.log("TEST_FALSE");
		}
	});
}
