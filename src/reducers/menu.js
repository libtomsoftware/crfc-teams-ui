import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function menuReducer(state = initialState.menu, action) {

    switch (action.type) {
    case types.MENU_SHOW:
        return action.menu;
    case types.MENU_HIDE:
        return action.menu;
    default:
        return state;
    }

}
