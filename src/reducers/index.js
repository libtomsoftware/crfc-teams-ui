import { combineReducers } from 'redux';
import config from './config';
import dialog from './dialog';

const rootReducer = combineReducers({
    config,
    dialog
});

export default rootReducer;
