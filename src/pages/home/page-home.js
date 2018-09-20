import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import * as accountsActions from '../../actions/accounts-actions';
import * as agegroupsActions from '../../actions/agegroups-actions';
import * as leaguesActions from '../../actions/leagues-actions';
import * as teamsActions from '../../actions/teams-actions';
import Cookies from '../../services/cookies';
import './page-home.css';

class PageHome extends Component {
    constructor() {
        super();

        this.dataToFetch = [
            'accounts',
            'agegroups',
            'leagues',
            'teams'
        ];
    }

    componentDidMount() {
        if (this.props.account && Cookies.read('footy-token')) {
            this.fetchData();
        }
    }

    fetchData() {
        const item = this.dataToFetch[0];
        const dataInProps = this.props[item];

        if (!!!dataInProps || !!!dataInProps.length) {
            this.props.actions[item].fetch().then(() => {
                this.dataToFetch.shift();

                if (this.dataToFetch.length) {
                    this.fetchData();
                }
            });
        }
    }

    render() {
        return (
            <div className="page page-home">
                {this.props.account &&
                    <div className="page-home-inner jumbotron">
                        <h1 className="display-3">Cassiobury Rangers FC</h1>
                        <p className="lead">Welcome to CRFC teams management app. Please use the menu buttons in the nav bar above to navigate or go directly to teams page using the button below.</p>
                        <p className="lead">
                            <Link
                                className="btn btn-primary btn-lg"
                                to="/teams"
                            >
                                Go to teams
                            </Link>
                        </p>
                        <hr className="my-4" />
                        <div className="page-home-stats-area">
                            {this.props.accounts && this.props.accounts.length > 0 && <span className="animated fadeIn">{this.props.accounts.length} managers</span>}
                            {this.props.teams && this.props.teams.length > 0 && <span className="animated fadeIn">{this.props.teams.length} teams</span>}
                            {this.props.agegroups && this.props.agegroups.length > 0 && <span className="animated fadeIn">{this.props.agegroups.length} age groups</span>}
                            {this.props.leagues && this.props.leagues.length > 0 && <span className="animated fadeIn">{this.props.leagues.length} leagues</span>}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
        accounts: state.accounts,
        agegroups: state.agegroups,
        leagues: state.leagues,
        teams: state.teams
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch),
            agegroups: bindActionCreators(agegroupsActions, dispatch),
            leagues: bindActionCreators(leaguesActions, dispatch),
            teams: bindActionCreators(teamsActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
