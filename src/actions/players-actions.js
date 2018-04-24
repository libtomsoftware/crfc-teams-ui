import * as types from './action-types';

function getPlayersUpdateEvent(players) {
    return {
        type: types.PLAYERS_UPDATE,
        players
    };
}

export function update(players) {
    return function (dispatch) {
        dispatch(getPlayersUpdateEvent(players));
    };
}
