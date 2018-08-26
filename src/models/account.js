import React from 'react';
import { Link } from 'react-router';
import { PropTypes } from 'prop-types';

const propTypes = {
    firstname: PropTypes.string,
    surname: PropTypes.string,
    username: PropTypes.string,
    phone: PropTypes.string,
    rank: PropTypes.number
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

export default class AccountModel {
    constructor(data = {}) {
        this._id = data._id;
        this.firstname = data.firstname;
        this.surname = data.surname;
        this.username = data.username;
        this.phone = data.phone;
        this.hidden = {
            rank: data.rank
        };

        this.actions = data.actions || this.getStandardActions(data._id);

        this.checkTypes();
    }

    getStandardActions(id) {
        return [{
            link: key => getLink(key, `/account/edit/${id}`, 'edit', 'fa-edit')
        }, {
            link: key => getLink(key, `/account/delete/${id}`, 'remove', 'fa-times')
        }];
    }

    checkTypes() {
        PropTypes.checkPropTypes(propTypes, this, 'prop', 'AccountModel');
    }
}
