import React from 'react';
import { browserHistory } from 'react-router';
import './footer.css';

class Footer extends React.Component {
    routeTo(path) {
        browserHistory.push(path);
    }

    render() {
        const links = [
            {
                route: '/home',
                label: 'home'
            },
            {
                route: '/login',
                label: 'login'
            },
            {
                route: '/players',
                label: 'players'
            },
            {
                route: '/player/add',
                label: 'add player'
            }
        ];
        return (
            <footer>
                {links.map((link, index) => {
                    return (
                        <button
                            key={index}
                            className="btn btn-primary" onClick={() => {
                                this.routeTo(link.route);
                            }}>
                            {link.label}
                        </button>
                    );
                })}
            </footer>
        );
    }
}

export default Footer;
