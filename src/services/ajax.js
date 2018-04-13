import fetch from 'isomorphic-fetch';
import { CONFIG } from '../config-constants';

class Ajax {
    get(request) {
        return fetch(request.url, {
            method: 'GET',
            headers: {
                'x-system-access-key': CONFIG.SYSTEM_ACCESS_KEY
            }
        }).then((response) => {
            return response.json();
        });
    }

    post(request) {
        const data = {
            json: JSON.stringify(request.body)
        };

        return fetch(request.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-system-access-key': CONFIG.SYSTEM_ACCESS_KEY
            },
            body: 'json=' + encodeURI(JSON.stringify(data))
        }).then((response) => {
            return response;
        });
    }

    delete(request) {
        return fetch(request.url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-system-access-key': CONFIG.SYSTEM_ACCESS_KEY
            }
        }).then((response) => {
            return response;
        });
    }
}

export default new Ajax();
