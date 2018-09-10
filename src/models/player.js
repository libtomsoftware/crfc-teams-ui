import React from 'react';
import { Link } from 'react-router';
import { PropTypes } from 'prop-types';

const propTypes = {
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    dob: PropTypes.string,
    team: PropTypes.string,
    guardian: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string
};

function getActionLink(key, to, title, className) {
    return (
        <Link
            key={key}
            to={to}
            className="btn"
            title={title}
        >
            <i className={`fas ${className}`} />
        </Link>
    );
}

export function getAgeGroup(value, agegroups) {
    if (!agegroups || !!!agegroups.length) {
        return '';
    }

    return agegroups.find(group => group._id === value).abbreviation;
}

export function getTeam(value, teams, agegroups) {
    if (!teams || !!!teams.length) {
        return '';
    }

    const team = teams.find(group => group._id === value);

    return team ? getAgeGroup(team.agegroup, agegroups) + ' ' + team.name : '';
}

export default class PlayerModel {
    constructor(data = {}, teams, agegroups) {
        this._id = data._id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.dob = data.dob;
        this.team = getTeam(data.team, teams, agegroups);
        this.guardian = data.guardian;
        this.email = data.email;
        this.mobile = data.mobile;
        this.actions = data.actions || this.getStandardActions(data._id);

        this.checkTypes();
    }

    getStandardActions(id) {
        return [{
            link: key => getActionLink(key, `/players/edit/${id}`, 'edit', 'fa-edit')
        }, {
            link: key => getActionLink(key, `/players/delete/${id}`, 'remove', 'fa-times')
        }];
    }

    checkTypes() {
        PropTypes.checkPropTypes(propTypes, this, 'prop', 'PlayerModel');
    }
}
