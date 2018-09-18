import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as navActions from '../../../actions/nav-actions';
import * as accountsActions from '../../../actions/accounts-actions';
import Cookies from '../../../services/cookies';
import { CONFIG } from '../../../config-constants';
import './nav.css';

class Nav extends Component {
    constructor() {
        super();

        this.toggleNav = this.toggleNav.bind(this);
    }

    get account() {
        return this.props && this.props.account ? this.props.account : {};
    }

    get navLinks() {
        return [
            {
                route: '/home',
                label: 'home',
                icon: 'fa-home',
                reqLogin: false
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
                icon: 'fa-sitemap',
                reqLogin: true,
                rank: 1
            },
            {
                route: '/players',
                label: 'players',
                icon: 'fa-users',
                reqLogin: true,
                param: 'all'
            },
            {
                route: '/settings',
                label: 'settings',
                icon: 'fa-sliders-h',
                reqLogin: true,
                rank: 1
            }
        ];
    }

    get menuLinks() {
        return [
            {
                route: '/players',
                label: 'players',
                icon: 'fa-users',
                reqLogin: true
            },
            {
                route: '/team',
                label: 'team',
                icon: 'fa-sitemap',
                reqLogin: true,
                param: this.account._id
            },
            {
                route: '/account/edit',
                label: 'account',
                icon: 'fa-id-card',
                reqLogin: true,
                param: this.account._id
            }
        ];
    }

    routeTo(event, path, param) {
        event.preventDefault();
        event.stopPropagation();
        this.props.actions.nav.hide();

        if (param) {
            path = `${path}/${param}`;
        }

        browserHistory.push(path);
    }

    toggleNav() {
        this.props.actions.nav[!this.props.nav ? 'show' : 'hide']();
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

    render() {
        return (
            <nav className="nav-wrapper">
                {this.isLoggedIn() &&
                    <div className="nav-bar bg-primary">
                        <button
                            className="nav-toggler"
                            type="button"
                            onClick={this.toggleNav}
                        >
                            <span className="nav-toggler-icon" />
                        </button>

                        {this.isLoggedIn() &&
                            <ul className="menu-links">
                                {this.menuLinks.map((link, index) => {
                                    const isShown = !link.reqLogin || (link.reqLogin && this.isLoggedIn() && this.hasEnoughRank(link.rank));

                                    return (isShown ?
                                        <li className={`menu-link ${link.separator ? 'separator' : ''}`} key={index}>
                                            <a href="#" title={link.label} onClick={event => {
                                                this.routeTo(event, link.route, link.param);
                                            }}>
                                                <i className={`fas ${link.icon}`} />
                                            </a>
                                        </li> : null);
                                })}
                            </ul>
                        }
                    </div>
                }

                {this.isLoggedIn() &&
                    <ul className={`nav-links fast animated ${this.props.nav ? 'show fadeInLeft' : ''}`}>
                        {this.navLinks.map((link, index) => {
                            const isShown = !link.reqLogin || (link.reqLogin && this.isLoggedIn() && this.hasEnoughRank(link.rank));

                            return (isShown ?
                                <li className={`nav-link ${link.separator ? 'separator' : ''}`} key={index}>
                                    <a href="#" title={link.label} onClick={event => {
                                        this.routeTo(event, link.route, link.param);
                                    }}>
                                        <i className={`fas ${link.icon}`} />
                                        <span>{link.label}</span>
                                    </a>
                                </li> : null);
                        })}
                    </ul>
                }
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        nav: state.nav,
        account: state.account
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            nav: bindActionCreators(navActions, dispatch),
            accounts: bindActionCreators(accountsActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
