import axios from 'axios';
import * as loaderActions from '../loader-actions';
import { CONFIG } from '../../config-constants';

export async function fetch(dispatch, resource) {
    let result;

    loaderActions.show()(dispatch);
    try {
        const response = await axios.get(`${CONFIG.URL.API}/${resource}`, {
            withCredentials: true
        });

        if (response && response.data) {
            result = response.data;
        }
    } catch (error) {
        console.error('async error', error);
    }

    loaderActions.hide()(dispatch);

    return result[resource] || result;
}
