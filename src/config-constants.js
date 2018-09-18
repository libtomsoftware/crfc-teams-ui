export const CONFIG = {
    MESSAGE: {
        ERROR: {
            ACCOUNT_EXISTS: 'An account with this username / email already exists. Please provide different email.',
            ACCOUNT_UPDATE: 'Account details could not be updated. Please try again later.',
            ACCOUNT_DELETE: 'Account has not been deleted. Please try again later.',
            API_UNAVAILABLE: 'API error! Is URL set correctly?',
            AGEGROUP_EXISTS: 'A similar age group already exists. Change symbol and try again!',
            AGEGROUP_NOT_ADDED: 'Adding new age group failed, aborting...',
            EMPTY_FIELDS: 'Some fields seem not to be filled.',
            FORM_INVALID: 'Make sure all fields contain correct data!',
            GAMERESULT_UPDATE: 'Game result type update failed. Please try again later.',
            GAMERESULT_EXISTS: 'A similar game result type already exists. Change name and try again!',
            GAMERESULT_NOT_ADDED: 'Adding new game result type failed, pleae try again later.',
            GAMESTATE_UPDATE: 'Game state type update failed. Please try again later.',
            GAMESTATE_EXISTS: 'A similar game state type already exists. Change name and try again!',
            GAMESTATE_NOT_ADDED: 'Adding new game state type failed, pleae try again later.',
            EMAIL_INVALID: 'This is not valid email!',
            LEAGUE_UPDATE: 'League update failed. Please try again later.',
            LEAGUE_EXISTS: 'A similar league already exists. Change short name and try again!',
            LEAGUE_NOT_ADDED: 'Adding new league failed, pleae try again later.',
            LOGIN: 'Login unsuccessful. Please make sure you have provided correct login details!',
            OPPONENT_UPDATE: 'Opponent team update failed. Please try again later.',
            OPPONENT_EXISTS: 'A similar opponent team already exists. Change name and / or description and try again!',
            OPPONENT_NOT_ADDED: 'Adding new opponent team failed, pleae try again later.',
            PASSWORD_INVALID: 'The password provided is not valid. It should be at least 8 characters long, but no longer than 16 characters, contain only alphanumeric characters and at least one number.',
            PASSWORDS_MISMATCH: 'Passwords provided don\'t seem to match.',
            PLAYER_EXISTS: 'A similar player already exists. Change name and / or date of birth and try again!',
            PLAYER_NOT_ADDED: 'Adding new player failed, pleae try again later.',
            PHONE_INVALID: 'This is not valid phone number! Please use digits only.',
            REGISTRATION: 'Registration unsuccessful. Please make sure you have provided correct registration details! If you did and it still doesn\'t work, please try again later',
            SOMETHING_WRONG: 'Oops, something is wrong...',
            TEAM_EXISTS: 'A team of similar name already exists in this age group. Change name and try again!',
            TEAM_NOT_ADDED: 'Adding new team failed, aborting...',
            TEAM_UPDATE: 'Updating team failed. Please try again later.'
        },
        INFO: {
            NONE_SO_FAR: items => {
                return `No ${items} so far...`;
            },
            RESULT: {
                ADDED: item => {
                    return `A new ${item} has been added!`;
                },
                DELETED: item => {
                    return `${item} has been successfully deleted.`;
                },
                UPDATED: item => {
                    return `${item} has been successfully updated.`;
                }
            },
            ABOUT_TO_DELETE: 'This operation cannot be undone! Please click DELETE below only if you are sure, what you are doing.',
            ITS_GONE: 'Done. It\'s gone.',
            NEW_ACCOUNT_REGISTERED: 'Congratulations! New account has been registered. Please log in with credentials provided or register another account.',
            PLAYER_REQUIRES_TEAM: 'At least one team is required to create a player! Please go to teams section and define an team.',
            TEAM_REQUIRES_AGEGROUP: 'At least one age group is required to create a team! Please go to age groups section and define an age group.',
            TEAM_REQUIRES_LEAGUE: 'At least one league is required to create a team! Please go to leagues section and add a league.',
            TEAM_REQUIRES_MANAGER: 'At least one manager is required to create a team! Please go to managers section and add a manager.'
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
