const localStorageSystemAccessKeyId = 'footy-systemAccessKey';

export const CONFIG = {//eslint-disable-line one-var
    API_URL: 'http://localhost:4002/api',
    SYSTEM_ACCESS_KEY: localStorage.getItem(localStorageSystemAccessKeyId) || 'xyz'
};
