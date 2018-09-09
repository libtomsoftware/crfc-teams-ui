import React from 'react';
import { Link } from 'react-router';
import { PropTypes } from 'prop-types';

const propTypes = {
    name: PropTypes.string,
    actions: PropTypes.array
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

export default class GameStateModel {
    constructor(data = {}) {
        this._id = data._id;
        this.name = data.name;
        this.actions = data.actions || this.getStandardActions(data._id);

        this.checkTypes();
    }

    getStandardActions(id) {
        return [{
            link: key => getLink(key, `/settings/gamestates/edit/${id}`, 'edit', 'fa-edit')
        }, {
            link: key => getLink(key, `/settings/gamestates/delete/${id}`, 'remove', 'fa-times')
        }];
    }

    checkTypes() {
        PropTypes.checkPropTypes(propTypes, this, 'prop', 'GameStateModel');
    }
}
