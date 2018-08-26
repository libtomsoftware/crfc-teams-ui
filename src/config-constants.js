export const CONFIG = {
    MESSAGE: {
        ERROR: {
            ACCOUNT_EXISTS: 'An account with this username / email already exists. Please provide different email.',
            ACCOUNT_UPDATE: 'Account details could not be updated. Please try again later.',
            ACCOUNT_DELETE: 'Account has not been deleted. Please try again later.',
            API_UNAVAILABLE: 'API error! Is URL set correctly?',
            CATEGORY_EXISTS: 'A similar category already exists. Change symbol and try again!',
            CATEGORY_NOT_ADDED: 'Adding new category failed, aborting...',
            EMPTY_FIELDS: 'Some fields seem not to be filled.',
            FORM_INVALID: 'Make sure all fields contain correct data!',
            EMAIL_INVALID: 'This is not valid email!',
            LOGIN: 'Login unsuccessful. Please make sure you have provided correct login details!',
            PASSWORD_INVALID: 'The password provided is not valid. It should be at least 8 characters long, but no longer than 16 characters, contain only alphanumeric characters and at least one number.',
            PASSWORDS_MISMATCH: 'Passwords provided don\'t seem to match.',
            PHONE_INVALID: 'This is not valid phone number! Please use digits only.',
            REGISTRATION: 'Registration unsuccessful. Please make sure you have provided correct registration details! If you did and it still doesn\'t work, please try again later',
            SOMETHING_WRONG: 'Oops, something is wrong...'
        },
        INFO: {
            ABOUT_TO_DELETE: 'This operation cannot be undone! Please click DELETE below only if you are sure, what you are doing.',
            ACCOUNT_UPDATED: 'Account details have been successfully updated!',
            ACCOUNT_DELETED: 'Account has been successfully deleted.',
            CATEGORY_DELETED: 'The category has been successfuly deleted!',
            ITS_GONE: 'Done. It\'s gone.',
            NEW_CATEGORY_ADDED: 'A new category has been added!',
            NEW_ACCOUNT_REGISTERED: 'Congratulations! New account has been registered. Please log in with credentials provided or register another account.',
            NO_CATEGORIES: 'No categories so far...',
            SETTINGS_UPDATED: 'Settings updated!'
        }
    },
    RANK: {
        ADMIN: 0,
        CHAIRMAN: 1,
        MANAGER: 2
    },
    REGEX: {
        ALPHABETIC_ONLY: /^\D+/g,
        ALPHANUMERIC_ONLY: /^[a-z0-9]+$/i,
        NUMBERS_ONLY: /^\d+$/,
        VALID_EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    STORAGE_KEY: {
        SESSION: {
            USER_DATA: 'footy-user-data'
        }
    },
    URL: {
        API: 'http://localhost:4000/api'
    }
};
