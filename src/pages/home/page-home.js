import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as accountsActions from '../../actions/accounts-actions';
import * as agegroupsActions from '../../actions/agegroups-actions';
import * as leaguesActions from '../../actions/leagues-actions';
import * as teamsActions from '../../actions/teams-actions';
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
        if (this.props.account) {
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
                    <div className="card card-stats bg-light mb-3">
                        <div className="card-header">Club in numbers</div>
                        <div className="card-body">
                            {this.props.accounts.length > 0 && <p className="card-text animated fadeIn">{this.props.accounts.length} managers</p>}
                            {this.props.teams.length > 0 && <p className="card-text animated fadeIn">{this.props.teams.length} teams</p>}
                            {this.props.agegroups.length > 0 && <p className="card-text animated fadeIn">{this.props.agegroups.length} age groups</p>}
                            {this.props.leagues.length > 0 && <p className="card-text animated fadeIn">{this.props.leagues.length} leagues</p>}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
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
