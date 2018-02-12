import apiConfig from './config';

export const fetchApi = (endPoint, payload = {}, strMethod = 'post', headers = {}) => {
    let oBody = '';
    if(strMethod.toUpperCase() === 'GET'){
        oBody = undefined;
    }else{
        oBody = JSON.stringify(
            payload)
    }

    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX_API_REQUEST');
    console.log('endPoint: ' + apiConfig.url + endPoint);
    console.log('payload: ' + oBody);
    console.log('strMethod: ' + strMethod);

    return fetch(apiConfig.url + endPoint,{
        method: strMethod,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: oBody
    })
	.catch((e) => {
		if (e.response && e.response.json) {
			e.response.json().then((json) => {
				if (json) throw json;
				throw e;
            });
		} else {
            throw e;
		}
	});
}

export const mockFetch = (endPoint, payload = {}, strMethod = 'post', headers = {}) => {
    let oBody = '';
    if(strMethod.toUpperCase() === 'GET'){
        oBody = undefined;
    }else{
        oBody = JSON.stringify(
            payload)
    }

    return fetch(endPoint,{
        method: strMethod,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: oBody
    })
	.catch((e) => {
		if (e.response && e.response.json) {
			e.response.json().then((json) => {
				if (json) throw json;
				throw e;
            });
		} else {
            throw e;
		}
	});
}
