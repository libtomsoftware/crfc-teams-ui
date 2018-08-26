import axios from 'axios';
import * as types from './action-types';
import { CONFIG } from '../config-constants';
import * as toastActions from './toast-actions';

function showToast(type, message, dispatch) {
    toastActions.show({
        message,
        type
    })(dispatch);
}

function getAccountsUpdateEvent(accounts) {
    return {
        type: types.ACCOUNTS_UPDATE,
        accounts
    };
}

export function fetch() {
    let accounts = [];
    return async function (dispatch) {
        try {
            const response = await axios.get(`${CONFIG.URL.API}/managers`, {
                withCredentials: true
            });

            if (response && response.data) {
                accounts = response.data.managers;
            }
        } catch (error) {
            console.error('accounts error', error);
        }

        dispatch(getAccountsUpdateEvent(accounts));

        return new Promise(resolve => {
            resolve(accounts);
        });
    };
}

export function remove(id) {
    return async function (dispatch) {
        try {
            await axios.delete(`${CONFIG.URL.API}/managers/${id}`, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.ACCOUNT_DELETED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.ACCOUNT_DELETE, dispatch);
        }

        return fetch()(dispatch);
    };
}

export function update(accounts) {
    return function (dispatch) {
        dispatch(getAccountsUpdateEvent(accounts));
    };
}
