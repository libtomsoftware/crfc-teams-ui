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

function getUpdateEvent(gamestates) {
    return {
        type: types.GAMESTATES_UPDATE,
        gamestates
    };
}

export async function load(dispatch) {
    return async.fetch(dispatch, 'gamestates');
}

export function fetch() {
    let gamestates = [];

    return async function (dispatch) {
        gamestates = await load(dispatch);

        dispatch(getUpdateEvent(gamestates));

        return new Promise(resolve => {
            resolve(gamestates);
        });
    };
}

export function add(opponentData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.put(`${CONFIG.URL.API}/gamestates`, opponentData, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.RESULT.ADDED('game state type'), dispatch);
        } catch (error) {
            let message;

            if (error.response && error.response.status === 409) {
                message = CONFIG.MESSAGE.ERROR.GAMESTATE_EXISTS;
            } else {
                message = CONFIG.MESSAGE.ERROR.GAMESTATE_NOT_ADDED;
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
            await axios.post(`${CONFIG.URL.API}/gamestates`, Object.assign({}, opponentData), {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.RESULT.UPDATED('Game state type'), dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.GAMESTATE_UPDATE, dispatch);
        }
        loaderActions.hide()(dispatch);

        return fetch()(dispatch);
    };
}

export function remove(id) {
    return async function (dispatch) {
        await async.remove(dispatch, {
            id,
            resource: 'gamestates',
            success: 'Game state type',
            error: 'GAMESTATE_DELETE'
        });
        return fetch()(dispatch);
    };
}

export function update(gamestates) {
    return function (dispatch) {
        dispatch(getUpdateEvent(gamestates));
    };
}
