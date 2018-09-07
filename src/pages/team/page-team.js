import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Footer from '../../components/common/footer/footer';

import * as teamActions from '../../actions/team-actions';
import * as toastActions from '../../actions/toast-actions';

class PageTeam extends Component {
    componentDidMount() {
        this.props.actions.team.find(
            this.props.params.managerId
        );
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
                    <div>
                        <h1>{team.agegroup} {team.name}</h1>
                        <p>{manager.firstname} {manager.surname}</p>
                        {coach && <span>{coach.firstname} {coach.surname}</span>}
                    </div>
                }
                <Footer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        teams: state.teams,
        team: state.team
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            team: bindActionCreators(teamActions, dispatch),
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageTeam);
