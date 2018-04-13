import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function configReducer(state = initialState.config, action) {

    switch (action.type) {
    case types.CONFIG_UPDATE:
        return action.config;

    default:
        return state;
    }

}
