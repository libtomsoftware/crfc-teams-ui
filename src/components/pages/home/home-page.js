import React from 'react';
import { browserHistory } from 'react-router';
import './home-page.css';

class HomePage extends React.Component {

    routeTo(path) {
        browserHistory.push(path);
    }

    render() {
        return (
            <div className="home-page">
                homepage
            </div>
        );
    }
}

export default HomePage;
