import axios from 'axios';
import { CONFIG } from '../config-constants';
import * as types from './action-types';
import * as toastActions from './toast-actions';
import * as loaderActions from './loader-actions';
import * as async from './common/async';

function showToast(type, message, dispatch) {
    toastActions.show({
        message,
        type
    })(dispatch);
}

function getUpdateEvent(gameresults) {
    return {
        type: types.GAMERESULTS_UPDATE,
        gameresults
    };
}

export async function load(dispatch) {
    return async.fetch(dispatch, 'gameresults');
}

export function fetch() {
    let gameresults = [];

    return async function (dispatch) {
        gameresults = await load(dispatch);

        dispatch(getUpdateEvent(gameresults));

        return new Promise(resolve => {
            resolve(gameresults);
        });
    };
}

export function add(opponentData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.put(`${CONFIG.URL.API}/gameresults`, opponentData, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.NEW_GAMERESULT_ADDED, dispatch);
        } catch (error) {
            let message;

            if (error.response && error.response.status === 409) {
                message = CONFIG.MESSAGE.ERROR.GAMERESULT_EXISTS;
            } else {
                message = CONFIG.MESSAGE.ERROR.GAMERESULT_NOT_ADDED;
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
            await axios.post(`${CONFIG.URL.API}/gameresults`, Object.assign({}, opponentData), {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.GAMERESULT_UPDATED, dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.GAMERESULT_UPDATE, dispatch);
        }
        loaderActions.hide()(dispatch);

        return fetch()(dispatch);
    };
}

export function remove(id) {
    return async function (dispatch) {
        await async.remove(dispatch, {
            id,
            resource: 'gameresults',
            success: 'GAMERESULT_DELETED',
            error: 'GAMERESULT_DELETE'
        });
        return fetch()(dispatch);
    };
}

export function update(gameresults) {
    return function (dispatch) {
        dispatch(getUpdateEvent(gameresults));
    };
}
