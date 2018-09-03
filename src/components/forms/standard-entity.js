import React, { Component, createRef } from 'react';
import { Link, withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CONFIG } from '../../config-constants';
import Helpers from '../../services/helpers';

import * as accountsActions from '../../actions/accounts-actions';
import * as agegroupsActions from '../../actions/agegroups-actions';
import * as leaguesActions from '../../actions/leagues-actions';
import * as gameresultsActions from '../../actions/gameresults-actions';
import * as opponentsActions from '../../actions/opponents-actions';
import * as teamsActions from '../../actions/teams-actions';
import * as toastActions from '../../actions/toast-actions';

class StandardEntityForm extends Component {
    constructor(props) {
        super(props);

        this.fields = {};

        if (props.fields) {
            props.fields.forEach(key => {
                this.fields[key] = createRef();
            });
        }

        this.submit = this.submit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    componentDidMount() {
        if (this.props.group) {
            this.props.actions[this.props.group].fetch();
        }
    }

    get defaultValues() {
        return this.props[this.props.group].find(item => {
            return item._id === this.props.params.id;
        });
    }

    clearForm() {
        Object.keys(this.fields).forEach(key => {
            this.fields[key].current.value = '';
        });

        setTimeout(this.props.actions.toast.hide, 3000);
    }

    showToast(details) {
        this.props.actions.toast.show({
            message: CONFIG.MESSAGE.ERROR.FORM_INVALID,
            details
        });
    }

    submit() {
        const values = Helpers.getFieldsValues(this.fields);
        const actions = this.props.actions[this.props.group];

        if (Helpers.hasEmptyMandatoryValues(this.props.fieldsets, values)) {
            this.showToast(CONFIG.MESSAGE.ERROR.EMPTY_FIELDS);
            return;
        }

        this.props.actions.toast.hide();

        if (this.isUpdate()) {
            actions.edit(Object.assign({}, values, {
                _id: this.props.params.id
            })).then(() => {
                this.clearForm();
                browserHistory.push(`/${this.props.groupPrefix ? this.props.groupPrefix + '/' : ''}${this.props.group}`);
            });
        } else {
            actions.add(values).then(this.clearForm);
        }
    }

    isUpdate() {
        return this.props.params && this.props.params.id && this.defaultValues;
    }

    showForm() {
        return Helpers.isPage([
            'add',
            'edit'
        ], this.props);
    }

    getTextControl(formGroup) {
        return (
            <input
                className="form-control"
                name={`${formGroup.name}`}
                type={`${formGroup.type || 'text'}`}
                placeholder={`${formGroup.placeholder}`}
                ref={this.fields[formGroup.name]}
                maxLength={`${formGroup.maxLength} || 36`}
                defaultValue={this.defaultValues ? this.defaultValues[formGroup.name] : ''}
            />
        );
    }

    getDropdownControl(formGroup) {
        return (
            <select
                name={`${formGroup.name}`}
                ref={this.fields[formGroup.name]}
                defaultValue={this.defaultValues ? this.defaultValues[formGroup.name] : ''}
                className="custom-select"
            >
                {formGroup.options.map((option, index) => {
                    return (
                        <option
                            key={index}
                            value={option.value}
                        >
                            {option.label}
                        </option>
                    );
                })}
            </select>
        );
    }

    isTextType(type) {
        return !![
            'text'
        ].find(textType => textType === type);
    }

    getFormControl(formGroup) {
        if (!formGroup.type || this.isTextType(formGroup.type)) {
            return this.getTextControl(formGroup);
        }

        if (formGroup.type === 'dropdown') {
            return this.getDropdownControl(formGroup);
        }

        return null;
    }

    render() {
        return (
            <div className="standard-form">
                {this.showForm() && this.props.fields && !!this.props.fields.length &&
                    <div className="standard-form-fields">
                        <div className="card mb-3">
                            <div className="card-header">{this.isUpdate() ? 'Update' : 'Add'} {this.props.title} </div>
                            <div className="card-body">
                                <div className="card-text">
                                    <div className="card-form">
                                        {this.props.fieldsets.map((fieldset, a) => {
                                            return (
                                                <fieldset key={a}>
                                                    {fieldset.formGroups.map((formGroup, b) => {
                                                        return (
                                                            <div className="form-group" key={b}>
                                                                <label className="control-label" htmlFor={`${formGroup.name}`}>
                                                                    {formGroup.label}{formGroup.isMandatory ? ' * ' : ''}
                                                                </label>
                                                                {this.getFormControl(formGroup)}
                                                            </div>
                                                        );
                                                    })}
                                                </fieldset>
                                            );
                                        })}
                                    </div>
                                    <div className="standard-form-buttons">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                this.submit();
                                            }}
                                            disabled={this.props.loader}
                                        >
                                            {this.isUpdate() ? 'Update' : 'Add'}
                                        </button>
                                    </div>
                                    <p className="standard-form-info">* mandatory fields</p>
                                </div>
                                {this.props.bottomLinks && !!this.props.bottomLinks.length &&
                                    <p className="standard-form-bottom">
                                        {this.props.bottomLinks.map((link, z) => {
                                            return (
                                                <Link
                                                    key={z}
                                                    to={`${link.href}`}
                                                    className={`btn ${link.class}`}
                                                >
                                                    {link.label}
                                                </Link>
                                            );
                                        })}
                                    </p>
                                }
                            </div>
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
        gameresults: state.gameresults,
        leagues: state.leagues,
        loader: state.loader,
        opponents: state.opponents,
        teams: state.teams
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            accounts: bindActionCreators(accountsActions, dispatch),
            agegroups: bindActionCreators(agegroupsActions, dispatch),
            gameresults: bindActionCreators(gameresultsActions, dispatch),
            leagues: bindActionCreators(leaguesActions, dispatch),
            opponents: bindActionCreators(opponentsActions, dispatch),
            teams: bindActionCreators(teamsActions, dispatch),
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StandardEntityForm));
