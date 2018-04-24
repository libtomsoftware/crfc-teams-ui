export default class ToastModel {
    constructor(data) {
        this.heading = data.heading;
        this.message = data.message;
        this.type = this.determineToastType(data.type);
    }

    determineToastType(type) {
        const allowedTypes = ['danger', 'warning', 'info'];

        if (!type || allowedTypes.indexOf(type) === -1) {
            return 'warning';
        }

        return type;
    }
}
