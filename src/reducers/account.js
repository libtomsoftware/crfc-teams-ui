import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function accountReducer(state = initialState.account, action) {

    switch (action.type) {
    case types.ACCOUNT_LOGIN:
    case types.ACCOUNT_LOGOUT:
    case types.ACCOUNT_UPDATE:
        return action.account;
    default:
        return state;
    }

}
