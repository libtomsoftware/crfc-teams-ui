import * as types from '../actions/action-types';
import initialState from '../store/initial-state';

export default function categoriesReducer(state = initialState.categories, action) {

    switch (action.type) {
    case types.CATEGORIES_UPDATE:
        return action.categories;
    default:
        return state;
    }

}
