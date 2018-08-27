import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { PropTypes } from 'prop-types';
import * as menuActions from '../../../actions/menu-actions';
import * as accountsActions from '../../../actions/accounts-actions';
import Cookies from '../../../services/cookies';
import { CONFIG } from '../../../config-constants';
import './navbar.css';

class Navbar extends Component {

    constructor() {
        super();

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    get account() {
        return this.props && this.props.account ? this.props.account : {};
    }

    get links() {
        return [
            {
                route: '/home',
                label: 'home',
                icon: 'fa-home',
                reqLogin: false
            },
            {
                route: '/account/edit',
                label: 'account',
                icon: 'fa-id-card',
                reqLogin: true,
                param: this.account._id
            },
            {
                route: '/settings',
                label: 'settings',
                icon: 'fa-cog',
                reqLogin: true
            },
            {
                route: '/accounts',
                label: 'managers',
                icon: 'fa-user-tie',
                reqLogin: true,
                rank: 1,
                separator: true
            },
            {
                route: '/teams',
                label: 'teams',
                icon: 'fa-users',
                reqLogin: true,
                rank: 1
            }
        ];
    }

    routeTo(event, path, param) {
        event.preventDefault();
        event.stopPropagation();
        this.props.actions.menu.hide();

        if (param) {
            path = `${path}/${param}`;
        }

        browserHistory.push(path);
    }

    isLoggedIn() {
        const token = Cookies.read('footy-token');
        const userData = sessionStorage.getItem(CONFIG.STORAGE_KEY.SESSION.USER_DATA);

        if (token && userData && !this.props.account) {
            const userDataParsed = JSON.parse(userData);

            this.props.actions.accounts.updateAccount(userDataParsed);
        }

        return this.props.account;
    }

    hasEnoughRank(rank) {
        if (!rank) {
            return true;
        }

        return this.props.account.rank <= rank;
    }

    toggleMenu() {
        this.props.actions.menu[!this.props.menu ? 'show' : 'hide']();
    }

    render() {
        return (
            <div className="navbar-wrapper">
                {this.isLoggedIn() &&
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <a
                        className="navbar-brand"
                        href="#"
                    />
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={this.toggleMenu}
                    >
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className={`collapse navbar-collapse ${this.props.menu ? 'show' : ''}`}>
                        <ul className="navbar-nav mr-auto">
                            {this.links.map((link, index) => {
                                const isShown = !link.reqLogin || (link.reqLogin && this.isLoggedIn() && this.hasEnoughRank(link.rank));

                                return (isShown ?
                                    <li className={`nav-item ${link.separator ? 'separator' : ''}`} key={index}>
                                        <a href="#" className="nav-link" title={link.label} onClick={event => {
                                            this.routeTo(event, link.route, link.param);
                                        }}>
                                            <i className={`fas ${link.icon}`} />
                                            <span>{link.label}</span>
                                        </a>
                                    </li> : null);
                            })}
                        </ul>
                    </div>
                </nav>
                }
            </div>
        );
    }

}

Navbar.propTypes = {
    menu: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        menu: state.menu,
        account: state.account
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            menu: bindActionCreators(menuActions, dispatch),
            accounts: bindActionCreators(accountsActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

