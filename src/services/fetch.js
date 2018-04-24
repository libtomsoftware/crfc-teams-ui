import fetch from 'isomorphic-fetch';
import { CONFIG } from '../config-constants';

class Fetch {
    send(method, request) {
        const isGetReq = method === 'GET';
        let details;

        if (!isGetReq) {
            details = {
                method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'x-system-access-key': CONFIG.SYSTEM_ACCESS_KEY
                }
            };

            if (request.body) {
                const data = {
                    json: JSON.stringify(request.body)
                };

                details.body = 'json=' + encodeURI(JSON.stringify(data));
            }
        }

        return fetch(request.url, details).then(response => {
            return isGetReq ? response.json() : response;
        });
    }

    get(request) {
        return this.send('GET', request);
    }

    post(request) {
        return this.send('POST', request);
    }

    put(request) {
        return this.send('PUT', request);
    }

    delete(request) {
        return this.send('DELETE', request);
    }
}

export default new Fetch();
