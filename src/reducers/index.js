import { combineReducers } from 'redux';
import config from './config';
import dialog from './dialog';
import players from './players';
import loader from './loader';
import toast from './toast';

const rootReducer = combineReducers({
    config,
    dialog,
    players,
    loader,
    toast
});

export default rootReducer;
