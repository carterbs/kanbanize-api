import axios from 'axios';

export function makeRequest(url, headers, body): Promise<any> {
	return new Promise((resolve, reject) => {
		axios({
			url,
			method: "POST",
			headers,
			data: JSON.stringify(body)
		})
			.then(res => resolve(res))
			.catch(e => {
				console.error(e);
				reject(e)
			});
	});
};