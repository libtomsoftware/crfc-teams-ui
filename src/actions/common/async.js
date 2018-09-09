import axios from 'axios';
import * as loaderActions from '../loader-actions';
import * as toastActions from '../toast-actions';
import { CONFIG } from '../../config-constants';

function showToast(type, message, dispatch) {
    toastActions.show({
        message,
        type
    })(dispatch);
}

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

    return result ? result[resource] || result : null;
}

export async function remove(dispatch, params) {
    loaderActions.show()(dispatch);
    try {
        await axios.delete(`${CONFIG.URL.API}/${params.resource}/${params.id}`, {
            withCredentials: true
        });

        showToast('success', CONFIG.MESSAGE.INFO.RESULT.DELETED(params.success), dispatch);
    } catch (error) {
        showToast('danger', CONFIG.MESSAGE.ERROR[params.error], dispatch);
    }

    loaderActions.hide()(dispatch);
}
