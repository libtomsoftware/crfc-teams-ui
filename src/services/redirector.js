import { browserHistory } from 'react-router';
import { CONFIG } from '../config-constants';

class Redirector {
    start() {
        this.stop();
        console.log('[services/redirector] Enabling new redirection timeout...');
        this.timeout = window.setTimeout(() => {
            browserHistory.push('/login');
            this.stop();
        }, CONFIG.BOARD_TIMEOUT || 60000);
    }

    stop() {
        if (this.timeout) {
            console.log('[services/redirector] Previous redirection timeout disabled...');
            window.clearTimeout(this.timeout);
        }
    }
}

export default new Redirector();
