import axios from 'axios';
import { CONFIG } from '../config-constants';
import * as types from './action-types';
import * as toastActions from './toast-actions';
import * as loaderActions from './loader-actions';

function showToast(type, message, dispatch) {
    toastActions.show({
        message,
        type
    })(dispatch);
}

function getUpdateEvent(opponents) {
    return {
        type: types.OPPONENTS_UPDATE,
        opponents
    };
}

export function fetch() {
    let opponents = [];

    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            const response = await axios.get(`${CONFIG.URL.API}/opponents`, {
                withCredentials: true
            });

            if (response && response.data) {
                opponents = response.data.opponents;
            }
        } catch (error) {
            console.error('opponents error', error);
        }

        dispatch(getUpdateEvent(opponents));
        loaderActions.hide()(dispatch);

        return new Promise(resolve => {
            resolve(opponents);
        });
    };
}

export function add(opponentData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.put(`${CONFIG.URL.API}/opponents`, opponentData, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.NEW_OPPONENT_ADDED, dispatch);
        } catch (error) {
            let message;

            if (error.response && error.response.status === 409) {
                message = CONFIG.MESSAGE.ERROR.OPPONENT_EXISTS;
            } else {
                message = CONFIG.MESSAGE.ERROR.OPPONENT_NOT_ADDED;
            }

            showToast('danger', message, dispatch);
        }
        loaderActions.hide()(dispatch);

        return fetch()(dispatch);
    };
}

export function edit(opponentData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.post(`${CONFIG.URL.API}/opponents`, Object.assign({}, opponentData), {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.OPPONENT_UPDATED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.OPPONENT_UPDATE, dispatch);
        }
        loaderActions.hide()(dispatch);

        return fetch()(dispatch);
    };
}

export function remove(id) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.delete(`${CONFIG.URL.API}/opponents/${id}`, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.OPPONENT_DELETED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.OPPONENT_DELETE, dispatch);
        }
        loaderActions.hide()(dispatch);
        return fetch()(dispatch);
    };
}

export function update(opponents) {
    return function (dispatch) {
        dispatch(getUpdateEvent(opponents));
    };
}
