import axios from 'axios';
import { CONFIG } from '../config-constants';
import * as types from './action-types';
import * as toastActions from './toast-actions';

function showToast(type, message, dispatch) {
    toastActions.show({
        message,
        type
    })(dispatch);
}

function getUpdateEvent(categories) {
    return {
        type: types.CATEGORIES_UPDATE,
        categories
    };
}

export function fetch() {
    let categories = [];

    return async function (dispatch) {
        try {
            const response = await axios.get(`${CONFIG.URL.API}/categories`, {
                withCredentials: true
            });

            if (response && response.data) {
                categories = response.data.categories;
            }
        } catch (error) {
            console.error('categories error', error);
        }

        dispatch(getUpdateEvent(categories));

        return new Promise(resolve => {
            resolve(categories);
        });
    };
}

export function add(categoryData) {
    return async function (dispatch) {
        try {
            await axios.put(`${CONFIG.URL.API}/categories`, categoryData, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.NEW_CATEGORY_ADDED, dispatch);
        } catch (error) {
            let message;

            if (error.response && error.response.status === 409) {
                message = CONFIG.MESSAGE.ERROR.CATEGORY_EXISTS;
            } else {
                message = CONFIG.MESSAGE.ERROR.CATEGORY_NOT_ADDED;
            }

            showToast('danger', message, dispatch);
        }

        return fetch()(dispatch);
    };
}

export function edit(categoryData) {
    return async function (dispatch) {
        try {
            await axios.post(`${CONFIG.URL.API}/categories`, Object.assign({}, categoryData), {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.ACCOUNT_UPDATED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.ACCOUNT_UPDATE, dispatch);
        }

        return fetch()(dispatch);
    };
}

export function remove(id) {
    return async function (dispatch) {
        try {
            await axios.delete(`${CONFIG.URL.API}/categories/${id}`, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.CATEGORY_DELETED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.ACCOUNT_UPDATE, dispatch);
        }

        return fetch()(dispatch);
    };
}

export function update(categories) {
    return function (dispatch) {
        dispatch(getUpdateEvent(categories));
    };
}
