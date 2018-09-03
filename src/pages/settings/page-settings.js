import React, { Component } from 'react';
import { Link } from 'react-router';
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
            <div className="page page-settings">
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
                    <Link
                        className="list-group-item list-group-item-action"
                        to={'/settings/leagues'}
                    >
                        Leagues
                    </Link>
                    <Link
                        className="list-group-item list-group-item-action"
                        to={'/settings/opponents'}
                    >
                        Opponents
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch)
        }
    };
}

export default connect(() => {
    return {};
}, mapDispatchToProps)(PageSettings);
