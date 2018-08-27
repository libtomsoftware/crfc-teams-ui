import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountsActions from '../../actions/accounts-actions';
import './page-home.css';

class PageHome extends Component {
    componentDidMount() {
        if (!!!this.props.accounts.length) {
            this.props.actions.accounts.fetch();
        }
    }

    render() {
        return (
            <div className="page page-home">
                <div className="card card-stats bg-light mb-3">
                    <div className="card-header">Club in numbers</div>
                    <div className="card-body">
                        <p className="card-text">{this.props.accounts.length} managers</p>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        accounts: state.accounts
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
