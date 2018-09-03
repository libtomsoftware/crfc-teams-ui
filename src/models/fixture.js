import React from 'react';
import { Link } from 'react-router';
import { PropTypes } from 'prop-types';

const propTypes = {
    datetime: PropTypes.string,
    isHome: PropTypes.boolean,
    location: PropTypes.string,
    opponent: PropTypes.string,
    result: PropTypes.string, //win, loss, draw
    score: PropTypes.string,
    state: PropTypes.string, //scheduled, cancelled, resolved
    team: PropTypes.string,
};

function getLink(key, to, title, className) {
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

export default class FixtureModel {
    constructor(data = {}) {
        this._id = data._id;
        this.datetime = data.datetime;
        this.isHome = data.isHome;
        this.location = data.location;
        this.result = data.result;
        this.opponent = data.opponent;
        this.score = data.score;
        this.state = data.state;
        this.team = data.team;

        this.actions = data.actions || this.getStandardActions(data._id);

        this.checkTypes();
    }

    getStandardActions(id) {
        return [{
            link: key => getLink(key, `/fixtures/edit/${id}`, 'edit', 'fa-edit')
        }, {
            link: key => getLink(key, `/fixtures/delete/${id}`, 'remove', 'fa-times')
        }];
    }

    checkTypes() {
        PropTypes.checkPropTypes(propTypes, this, 'prop', 'FixtureModel');
    }
}
