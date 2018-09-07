import axios from 'axios';
import { browserHistory } from 'react-router';
import * as types from './action-types';
import { CONFIG } from '../config-constants';
import * as toastActions from './toast-actions';
import * as loaderActions from './loader-actions';
import * as async from './common/async';
import Cookies from '../services/cookies';

function showToast(type, message, dispatch) {
    toastActions.show({
        message,
        type
    })(dispatch);
}

function getLogoutEvent() {
    return {
        type: types.ACCOUNT_LOGOUT,
        account: null
    };
}

function getAccountUpdateEvent(account) {
    return {
        type: types.ACCOUNT_UPDATE,
        account
    };
}

function getAccountsUpdateEvent(accounts) {
    return {
        type: types.ACCOUNTS_UPDATE,
        accounts
    };
}

export function login(username, password) {
    let userData;

    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            const response = await axios.post(`${CONFIG.URL.API}/login`, {
                username,
                password
            }, {
                withCredentials: true
            });

            if (Cookies.read('footy-token')) {
                userData = response.data;

                sessionStorage.setItem(CONFIG.STORAGE_KEY.SESSION.USER_DATA, JSON.stringify(userData));
                setTimeout(() => {
                    loaderActions.hide()(dispatch);
                    browserHistory.push('/home');
                }, 250);
            }
        } catch (error) {
            console.warn('Login error:', error);
            showToast('warning', CONFIG.MESSAGE.ERROR.LOGIN, dispatch);
            loaderActions.hide()(dispatch);
            browserHistory.push('/login');
        }

        dispatch({
            type: types.ACCOUNT_LOGIN,
            account: userData || null
        });
    };
}

export function logout() {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.delete(`${CONFIG.URL.API}/logout`, {
                withCredentials: true
            });
            Cookies.remove('footy-token');
            sessionStorage.removeItem(CONFIG.STORAGE_KEY.SESSION.USER_DATA);
            setTimeout(() => {
                loaderActions.hide()(dispatch);
                browserHistory.push('/login');
            }, 100);
        } catch (error) {
            console.error('Logout error:', error);
        }

        dispatch(getLogoutEvent());
    };
}

export function register(userData, clearFieldsCallback) {
    let registrationResult;

    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.put(`${CONFIG.URL.API}/register`, userData);

            loaderActions.hide()(dispatch);
            showToast('success', CONFIG.MESSAGE.INFO.NEW_ACCOUNT_REGISTERED, dispatch);
            clearFieldsCallback();

            registrationResult = true;
        } catch (error) {
            let message;

            if (error.response && error.response.status === 409) {
                message = CONFIG.MESSAGE.ERROR.ACCOUNT_EXISTS;
            } else {
                message = CONFIG.MESSAGE.ERROR.REGISTRATION;
            }

            registrationResult = false;

            loaderActions.hide()(dispatch);
            showToast('danger', message, dispatch);
            browserHistory.push('/register');
        }

        dispatch({
            type: types.ACCOUNT_REGISTER, //no reducer
            register: registrationResult
        });
    };
}

export async function load(dispatch) {
    return async.fetch(dispatch, 'accounts');
}

export function fetch() {
    let accounts = [];

    return async function (dispatch) {
        accounts = await load(dispatch);

        dispatch(getAccountsUpdateEvent(accounts));

        return new Promise(resolve => {
            resolve(accounts);
        });
    };
}

export function remove(id) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.delete(`${CONFIG.URL.API}/accounts/${id}`, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.ACCOUNT_DELETED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.ACCOUNT_DELETE, dispatch);
        }

        loaderActions.hide()(dispatch);
        return fetch()(dispatch);
    };
}

export function edit(id, userData, accountId) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            const response = await axios.post(`${CONFIG.URL.API}/accounts`, Object.assign({}, userData, {
                _id: id
            }), {
                withCredentials: true
            });

            loaderActions.hide()(dispatch);
            showToast('success', CONFIG.MESSAGE.INFO.ACCOUNT_UPDATED, dispatch);

            if (id === accountId) {
                dispatch({
                    type: types.ACCOUNT_UPDATE,
                    account: response.data
                });
            }
        } catch (error) {
            loaderActions.hide()(dispatch);
            showToast('danger', CONFIG.MESSAGE.ERROR.ACCOUNT_UPDATE, dispatch);
        }
    };
}

export function updateAccounts(accounts) {
    return function (dispatch) {
        dispatch(getAccountsUpdateEvent(accounts));
    };
}

export function updateAccount(account) {
    return function (dispatch) {
        dispatch(getAccountUpdateEvent(account));
    };
}
