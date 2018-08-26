import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountActions from '../../actions/account-actions';
import Footer from '../../components/common/footer/footer';
import './page-settings.css';

class PageSettingsAgeGroups extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="page page-settings page-settings-age-groups">
                leagues
                <button onClick={this.logout} className="btn btn-secondary">Log out</button>
                <Footer />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            account: bindActionCreators(accountActions, dispatch)
        }
    };
}

export default connect(() => {
    return {};
}, mapDispatchToProps)(PageSettingsAgeGroups);
