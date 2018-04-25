const localStorageSystemAccessKeyId = 'footy-systemAccessKey';

export const CONFIG = {//eslint-disable-line one-var
    API_URL: 'http://localhost:4002/api',
    SYSTEM_ACCESS_KEY: localStorage.getItem(localStorageSystemAccessKeyId) || 'xyz',
    MESSAGE: {
        CONFIRM: {
            EDIT_PLAYER: 'Are you sure you want to update player details?',
            REMOVE_PLAYER: 'Are you sure you want to delete player? This cannot be undone...'
        },
        ERROR: {
            FAILED_TO_ADD_PLAYER: 'Adding new player failed!',
            FAILED_TO_LOAD_PLAYERS: 'Failed to load players!',
            FAILED_TO_DELETE_PLAYER: 'Failed to delete player!'
        }
    }
};
