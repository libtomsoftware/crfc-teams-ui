import React, { Component, createRef } from 'react';
import { Link, withRouter, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CONFIG } from '../../config-constants';
import Helpers from '../../services/helpers';
import * as toastActions from '../../actions/toast-actions';
import * as categoriesActions from '../../actions/categories-actions';

class SettingsClubCategoryForm extends Component {
    constructor(props) {
        super(props);

        this.fields = {
            symbol: createRef(),
            description: createRef()
        };

        this.state = {
            disabled: false
        };

        this.submit = this.submit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    componentDidMount() {
        this.props.actions.categories.fetch();
    }

    get defaultValues() {
        const category = this.props.categories.find(item => {
            return item._id === this.props.params.id;
        });

        return category;
    }

    clearForm() {
        Object.keys(this.fields).forEach(key => {
            this.fields[key].current.value = '';
        });

        this.setState({
            disabled: false
        });

        setTimeout(this.props.actions.toast.hide, 3000);
    }

    redirectToEmpty() {
        browserHistory.push('/settings/categories/add');
    }

    showToast(details) {
        this.props.actions.toast.show({
            message: CONFIG.MESSAGE.ERROR.FORM_INVALID,
            details
        });
    }

    submit() {
        this.setState({
            disabled: true
        });

        const values = Helpers.getFieldsValues(this.fields);
        const actions = this.props.actions.categories;

        if (Helpers.hasEmptyValues(values)) {
            this.showToast(CONFIG.MESSAGE.ERROR.EMPTY_FIELDS);
            return;
        }

        const { symbol, description } = values;

        this.props.actions.toast.hide();

        if (this.isUpdate()) {
            actions.edit({
                symbol,
                description,
                _id: this.props.params.id
            }).then(() => {
                this.clearForm();
                this.redirectToEmpty();
            });
        } else {
            actions.add({
                symbol,
                description
            }).then(this.clearForm);
        }
    }

    isUpdate() {
        return this.props.params && this.props.params.id && this.defaultValues;
    }

    render() {
        return (
            <div className="standard-form">
                <div className="standard-form-fields">
                    <div className="card mb-3">
                        <div className="card-header">{this.isUpdate() ? 'Update' : 'Add'} category </div>
                        <div className="card-body">
                            <div className="card-text">
                                <div className="card-form">
                                    <fieldset>
                                        <div className="form-group">
                                            <label className="control-label" htmlFor="symbol">
                                                Symbol / short name
                                            </label>
                                            <input
                                                className="form-control"
                                                name="symbol"
                                                type="text"
                                                placeholder="symbol / short name"
                                                ref={this.fields.symbol}
                                                maxLength="6"
                                                defaultValue={this.defaultValues ? this.defaultValues.symbol : ''}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label" htmlFor="description">
                                                Description
                                            </label>
                                            <input
                                                className="form-control"
                                                name="description"
                                                type="text"
                                                placeholder="description, e.g. 'under 15s'"
                                                ref={this.fields.description}
                                                maxLength="25"
                                                defaultValue={this.defaultValues ? this.defaultValues.description : ''}
                                            />
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="standard-form-buttons">
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            this.submit();
                                        }}
                                        disabled={this.state.disabled}
                                    >
                                        {this.isUpdate() ? 'Update' : 'Add'}
                                    </button>
                                </div>
                            </div>
                            <p className="standard-form-bottom">
                                <Link
                                    to={'/settings/categories'}
                                    className="btn btn-primary"
                                >
                                    List of categories
                                </Link>
                                <Link
                                    className="btn btn-secondary"
                                    to={'/settings'}
                                >
                                    More settings
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            categories: bindActionCreators(categoriesActions, dispatch),
            toast: bindActionCreators(toastActions, dispatch)
        }
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsClubCategoryForm));
