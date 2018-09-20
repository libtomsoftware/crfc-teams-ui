import React from 'react';
import { Link } from 'react-router';
import { PropTypes } from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    agegroup: PropTypes.string,
    league: PropTypes.string,
    link: PropTypes.object,
    managers: PropTypes.array
};

export function getAgeGroup(value, agegroups) {
    if (!agegroups || !!!agegroups.length) {
        return '';
    }

    return agegroups.find(group => group._id === value).abbreviation;
}

export function getLeague(value, leagues) {
    if (!leagues || !!!leagues.length) {
        return '';
    }

    return leagues.find(group => group._id === value).abbreviation;
}

export function getManagers(values, accounts) {
    const result = [];

    if (!accounts || !!!accounts.length) {
        return result;
    }

    const manager = accounts.find(group => group._id === values[0]);
    const coach = accounts.find(group => group._id === values[1]);

    if (manager) {
        result.push( {
            _id: manager._id,
            firstname: manager.firstname,
            surname: manager.surname,
            phone: manager.phone,
            email: manager.username
        });
    }

    if (coach) {
        result.push( {
            _id: coach._id,
            firstname: coach.firstname,
            surname: coach.surname,
            phone: coach.phone,
            email: coach.username
        });
    }

    return result;
}

function getLink(value) {
    return (
        <a href={value} target="_blank">
            <i className="fas fa-link" />
        </a>
    );
}

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

export default class TeamModel {
    constructor(data = {}, accounts, agegroups, leagues) {
        this._id = data._id;
        this.agegroup = getAgeGroup(data.agegroup, agegroups);
        this.name = data.name;
        this.league = getLeague(data.league, leagues);
        this.managers = getManagers([data.manager, data.manager2], accounts);

        this.link = getLink(`http://cassioburyrangersfc.co.uk/#/page/teams${data.link}`);
        this.actions = data.actions || this.getStandardActions(data._id);

        this.checkTypes();
    }

    getStandardActions(id) {
        return [{
            link: key => getActionLink(key, `/teams/edit/${id}`, 'edit', 'fa-edit')
        }, {
            link: key => getActionLink(key, `/teams/delete/${id}`, 'remove', 'fa-times')
        }];
    }

    checkTypes() {
        PropTypes.checkPropTypes(propTypes, this, 'prop', 'TeamModel');
    }
}
