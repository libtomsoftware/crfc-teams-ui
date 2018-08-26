import { PropTypes } from 'prop-types';

const propTypes = {
    heading: PropTypes.string,
    message: PropTypes.string,
    details: PropTypes.string,
    type: PropTypes.string
};

export default class ToastModel {
    constructor(data = {}) {
        this.heading = data.heading;
        this.message = data.message;
        this.details = data.details;
        this.type = this.determineToastType(data.type);

        this.checkTypes();
    }

    determineToastType(type) {
        const allowedTypes = ['danger', 'warning', 'info', 'success'];

        if (!type || allowedTypes.indexOf(type) === -1) {
            return 'warning';
        }

        return type;
    }

    checkTypes() {
        PropTypes.checkPropTypes(propTypes, this, 'prop', 'ToastModel');
    }
}
