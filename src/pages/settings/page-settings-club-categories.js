import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as categoriesActions from '../../actions/categories-actions';
import { StandardTable } from '../../components/tables/standard-table';
import SettingsClubCategoryForm from '../../components/forms/settings-club-category';
import StandardDeleteForm from '../../components/forms/standard-delete';
import Footer from '../../components/common/footer/footer';
import Helpers from '../../services/helpers';
import './page-settings.css';
import { CONFIG } from '../../config-constants';
import CategoryModel from '../../models/category';

class PageSettingsClubCategories extends Component {
    constructor(props) {
        super(props);

        this.fields = {
            symbol: createRef(),
            description: createRef()
        };
    }

    componentDidMount() {
        this.props.actions.categories.fetch();
    }

    get tableData() {
        const categories = this.props.categories;

        if (!categories || !!!categories.length) {
            return [];
        }

        const tableData = {
            header: ['Symbol', 'Description', 'Actions'],
            items: categories.map(category => {
                return new CategoryModel(category);
            }).sort((a, b) => {
                return Helpers.sortAscending('symbol')(a, b);
            })
        };

        return tableData;
    }

    get tableMessage() {
        return CONFIG.MESSAGE.INFO.NO_CATEGORIES;
    }

    get tableBottomLinks() {
        return [{
            label: 'Add new',
            class: 'btn-primary',
            href: '/settings/categories/add'
        }];
    }

    showCategoriesTable() {
        return !Helpers.isPage([
            'add',
            'edit',
            'delete'
        ], this.props);
    }

    showCategoryForm() {
        return Helpers.isPage([
            'add',
            'edit'
        ], this.props);
    }

    showDeleteForm() {
        return Helpers.isPage([
            'delete'
        ], this.props);
    }

    extractCategorySymbol(id) {
        const category = this.props.categories.find(item => item._id === id);

        return category ? category.symbol : '';
    }

    get deleteBottomLinks() {
        return [{
            href: '/settings/categories',
            class: 'btn btn-primary',
            label: 'List of categories'
        }, {
            class: 'btn btn-secondary',
            href: '/settings',
            label: 'More settings'
        }];
    }

    render() {
        return (
            <div className="page page-settings page-settings-categories">
                {this.showCategoriesTable() &&
                    <StandardTable
                        message={this.tableMessage}
                        tableData={this.tableData}
                        bottomLinks={this.tableBottomLinks}
                    />
                }
                {this.showCategoryForm() && <SettingsClubCategoryForm />}
                {this.showDeleteForm() &&
                    <StandardDeleteForm
                        deleteGroup="categories"
                        deleteSubject={`Category ${this.extractCategorySymbol(this.props.params.id)}`}
                        generalMessage={CONFIG.MESSAGE.INFO.ABOUT_TO_DELETE}
                        bottomLinks={this.deleteBottomLinks}
                    />
                }
                <Footer />
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
            categories: bindActionCreators(categoriesActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSettingsClubCategories);
