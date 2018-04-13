import React from 'react';
import { browserHistory } from 'react-router';
import './footer.css';

class Footer extends React.Component {
    routeTo(path) {
        browserHistory.push(path);
    }

    render() {
        return (
            <footer>
                <div>
                    <button onClick={() => {
                        this.routeTo('/home');
                    }}>home</button>
                    <button onClick={() => {
                        this.routeTo('/login');
                    }}>login</button>
                </div>
            </footer>
        );
    }
}

export default Footer;
