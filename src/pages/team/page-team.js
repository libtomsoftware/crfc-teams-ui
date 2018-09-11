import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Footer from '../../components/common/footer/footer';

import * as playersActions from '../../actions/players-actions';
import * as teamActions from '../../actions/team-actions';
import * as toastActions from '../../actions/toast-actions';

import './page-team.css';

class PageTeam extends Component {
    componentDidMount() {
        this.props.actions.team.find(
            this.props.params.managerId
        );
        this.props.actions.players.fetch();
    }

    isCurrentAccount(id) {
        return this.props.account._id === id;
    }

    render() {
        const team = this.props.team;
        let manager;
        let coach;

        if (team) {
            manager = team.managers[0];
            coach = team.managers[1];
        }

        return (
            <div className="page page-team">
                {team &&
                    <div className="page-team-inner">
                        <h1>{team.agegroup} {team.name}</h1>

                        <div className="page-team-area">
                            <div className="team-details">
                                <div className="card mb-3">
                                    <h3 className="card-header">Manager</h3>
                                    <div className="card-body">
                                        <h5 className="card-title">
                                            {manager.firstname}
                                        </h5>
                                        <h6 className="card-subtitle text-muted">{manager.surname}</h6>
                                    </div>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">{manager.email}</li>
                                        <li className="list-group-item">{manager.phone}</li>
                                    </ul>
                                    {coach &&
                                        <div className="card-footer text-muted">
                                            Support: {coach.firstname} {coach.surname}
                                        </div>
                                    }
                                </div>
                            </div>

                            {!!this.props.players.length &&
                                <div className="team-players">
                                    <h3>Players</h3>
                                    <ul className="list-group">
                                        {this.props.players.map((player, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className="list-group-item d-flex justify-content-between align-items-center"
                                                >
                                                    <Link
                                                        to={`/player/${player._id}`}
                                                    >
                                                        {player.firstname} {player.lastname}
                                                    </Link>
                                                </li>
                                            );
                                        })}

                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                }
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        account: state.account,
        players: state.players,
        teams: state.teams,
        team: state.team
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            players: bindActionCreators(playersActions, dispatch),
            team: bindActionCreators(teamActions, dispatch),
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTeam);
