const localStorageSystemAccessKeyId = 'footy-systemAccessKey';

export const CONFIG = {//eslint-disable-line one-var
    SYSTEM_ACCESS_KEY: localStorage.getItem(localStorageSystemAccessKeyId)
};
