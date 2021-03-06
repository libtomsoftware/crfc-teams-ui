import React, { Component } from 'react';
import { withRouter, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountsActions from '../../actions/accounts-actions';
import Footer from '../../components/common/footer/footer';
import './page-settings.css';

class PageSettings extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
    }

    logout() {
        this.props.actions.accounts.logout();
    }

    render() {
        return (
            <div className="page page-settings page-settings-gateway">
                <h1 className="display-5">Settings</h1>
                <p className="lead">These settings are required to populate dropdowns in other forms within the application. Please choose one of the options below.</p>
                <div className="page-settings-gateway-inner">
                    <div className="list-group">
                        <div className="list-group-item active">
                            Club settings
                        </div>
                        <Link
                            className="list-group-item list-group-item-action"
                            to={'/settings/agegroups'}
                        >
                            Age Groups
                        </Link>
                    </div>

                    <div className="list-group">
                        <div className="list-group-item active">
                            Competition settings
                        </div>
                        <Link
                            className="list-group-item list-group-item-action"
                            to={'/settings/leagues'}
                        >
                            Leagues
                        </Link>
                        {false &&
                            <Link
                                className="list-group-item list-group-item-action"
                                to={'/settings/opponents'}
                            >
                                Opponents
                            </Link>
                        }
                    </div>

                </div>

                {false &&
                    <div className="list-group">
                        <div className="list-group-item active">
                            Fixtures settings
                        </div>
                        <Link
                            className="list-group-item list-group-item-action"
                            to={'/settings/gameresults'}
                        >
                            Game result types
                        </Link>
                        <Link
                            className="list-group-item list-group-item-action"
                            to={'/settings/gamestates'}
                        >
                            Game state types
                        </Link>
                    </div>
                }
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state;
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch)
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageSettings));
