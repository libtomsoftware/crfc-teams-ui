import Ajax from '../services/ajax';

class Poller {
    constructor() {
        this.initialized = false;
        this.intervals = {};
    }

    run(request, time) {
        if (!this.intervals[request.id]) {
            const interval = setInterval(function () {
                Ajax.get(request).then(request.success).catch(request.error);
            }, time || 5000);

            this.intervals[request.id] = interval;
        }
    }

    stop(id) {
        if (this.intervals[id]) {
            clearInterval(this.intervals[id]);
            delete this.intervals[id];
        }
    }
}

export default new Poller();
