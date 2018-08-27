import Cookies from './cookies';
import { CONFIG } from '../config-constants';

class Helpers {
    capitalize(string) {
        return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
    }

    shouldRedirectToLogin(path) {
        const isLoggedIn = Cookies.read('footy-token');
        const isPublicPath = [
            '/login',
            '/register'
        ].find(publicPath => publicPath === path);

        if (isLoggedIn || isPublicPath) {
            return false;
        }

        return true;
    }

    hasEmptyValues(values) {
        let hasEmpty = false;

        Object.keys(values).forEach(key => {
            if (!values[key]) {
                hasEmpty = true;
            }
        });

        return hasEmpty;
    }

    getFieldsValues(fields) {
        const values = {};

        Object.keys(fields).forEach(key => {
            values[key] = fields[key].current.value;
        });

        return values;
    }

    isValidEmail(email) {
        return CONFIG.REGEX.VALID_EMAIL.test(String(email).toLowerCase());
    }

    isValidPhone(phone) {
        return CONFIG.REGEX.NUMBERS_ONLY.test(String(phone).toLowerCase());
    }

    isPage(types, props) {
        if (!props.params || !props.params.type) {
            return false;
        }

        return types.find(type => {
            return props.params.type === type;
        }) !== undefined;
    }

    sortAscending(param) {
        return (a, b) => {
            const aParam = a[param];
            const bParam = b[param];

            if (!aParam || !bParam) {
                return 0;
            }

            const aNum = parseInt(a[param].replace( /^\D+/g, ''), 10);
            const bNum = parseInt(b[param].replace( /^\D+/g, ''), 10);

            if (!isNaN(aNum) && !isNaN(bNum)) {
                return aNum - bNum;
            }

            if (!isNaN(aNum) && isNaN(bNum)) {
                return -1;
            }

            if (isNaN(aNum) && !isNaN(bNum)) {
                return 1;
            }

            if (a[param] < b[param]) {
                return -1;
            }

            if (a[param] > b[param]) {
                return 1;
            }

            return 0;
        };
    }
}

export default new Helpers();
