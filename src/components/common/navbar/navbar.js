import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import * as menuActions from '../../../actions/menu-actions';
import './navbar.css';

class Navbar extends Component {

    constructor() {
        super();

        this.links = [
            {
                route: '/home',
                label: 'home',
                icon: 'fa-home'
            },
            {
                route: '/players',
                label: 'players',
                icon: 'fa-users'
            }
        ];
    }

    routeTo(event, path) {
        event.preventDefault();
        event.stopPropagation();
        browserHistory.push(path);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <a
                    className="navbar-brand"
                    href="#"
                />
                <button
                    className="navbar-toggler"
                    type="button"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        {this.links.map((link, index) => {
                            return (
                                <li className="nav-item" key={index}>
                                    <a href="#" className="nav-link" title={link.label} onClick={event => {
                                        this.routeTo(event, link.route);
                                    }}>
                                        <i className={`fas ${link.icon}`} />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        );
    }

}

Navbar.propTypes = {
    menu: PropTypes.object
};

function mapStateToProps(state) {
    return {
        menu: state.menu
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            menu: bindActionCreators(menuActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

