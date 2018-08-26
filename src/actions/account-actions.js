import axios from 'axios';
import { browserHistory } from 'react-router';
import { CONFIG } from '../config-constants';
import * as types from './action-types';
import * as toastActions from './toast-actions';
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

function getUpdateEvent(account) {
    return {
        type: types.ACCOUNT_UPDATE,
        account
    };
}

export function login(username, password) {
    let userData;

    return async function (dispatch) {
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
                browserHistory.push('/home');
            }
        } catch (error) {
            console.warn('Login error:', error);
            showToast('warning', CONFIG.MESSAGE.ERROR.LOGIN, dispatch);
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
        try {
            await axios.delete(`${CONFIG.URL.API}/logout`, {
                withCredentials: true
            });
        } catch (error) {
            console.error('Logout error:', error);
        }

        Cookies.remove('footy-token');
        sessionStorage.removeItem(CONFIG.STORAGE_KEY.SESSION.USER_DATA);
        browserHistory.push('/');
        dispatch(getLogoutEvent());
    };
}

export function register(userData, clearFieldsCallback) {
    let registrationResult;

    return async function (dispatch) {
        try {
            await axios.put(`${CONFIG.URL.API}/register`, userData);

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

            showToast('danger', message, dispatch);
            browserHistory.push('/register');
        }

        dispatch({
            type: types.ACCOUNT_REGISTER, //no reducer
            register: registrationResult
        });
    };
}

export function edit(id, userData, accountId) {
    return async function (dispatch) {
        try {
            const response = await axios.post(`${CONFIG.URL.API}/managers`, Object.assign({}, userData, {
                _id: id
            }), {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.ACCOUNT_UPDATED, dispatch);

            if (id === accountId) {
                dispatch({
                    type: types.ACCOUNT_UPDATE,
                    account: response.data
                });
            }
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.ACCOUNT_UPDATE, dispatch);
        }
    };
}

export function update(account) {
    return function (dispatch) {
        dispatch(getUpdateEvent(account));
    };
}
