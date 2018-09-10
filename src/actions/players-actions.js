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

function getUpdateEvent(players) {
    return {
        type: types.PLAYERS_UPDATE,
        players
    };
}

export async function load(dispatch) {
    return async.fetch(dispatch, 'players');
}

export function fetch() {
    let players = [];

    return async function (dispatch) {
        players = await load(dispatch);

        dispatch(getUpdateEvent(players));

        return new Promise(resolve => {
            resolve(players);
        });
    };
}

export function add(agegroupData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.put(`${CONFIG.URL.API}/players`, agegroupData, {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.RESULT.ADDED('player'), dispatch);
        } catch (error) {
            let message;

            if (error.response && error.response.status === 409) {
                message = CONFIG.MESSAGE.ERROR.PLAYER_EXISTS;
            } else {
                message = CONFIG.MESSAGE.ERROR.PLAYER_NOT_ADDED;
            }

            showToast('danger', message, dispatch);
        }
        loaderActions.hide()(dispatch);
        return fetch()(dispatch);
    };
}

export function edit(agegroupData) {
    return async function (dispatch) {
        loaderActions.show()(dispatch);
        try {
            await axios.post(`${CONFIG.URL.API}/players`, Object.assign({}, agegroupData), {
                withCredentials: true
            });

            showToast('success', CONFIG.MESSAGE.INFO.RESULT.UPDATED('Player'), dispatch);
        } catch (error) {
            showToast('danger', CONFIG.MESSAGE.ERROR.PLAYER_UPDATE, dispatch);
        }
        loaderActions.hide()(dispatch);
        return fetch()(dispatch);
    };
}

export function remove(id) {
    return async function (dispatch) {
        await async.remove(dispatch, {
            id,
            resource: 'players',
            success: 'Player',
            error: 'PLAYER_DELETE'
        });
        return fetch()(dispatch);
    };
}

export function update(players) {
    return function (dispatch) {
        dispatch(getUpdateEvent(players));
    };
}
