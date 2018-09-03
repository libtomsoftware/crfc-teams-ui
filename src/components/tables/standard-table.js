import React from 'react';
import { Link } from 'react-router';
import './tables.css';

export const StandardTable = (props) => {

    function showTable() {
        const hasRequiredData = props.tableData &&
            props.tableData.items &&
            !!props.tableData.items.length &&
            props.tableData.header &&
            !!props.tableData.header.length;

        return hasRequiredData;
    }

    function showTopLinks() {
        const isLoaderShown = props.loader;
        const hasTableLinks = props.isTablePage && props.tableLinks && !!props.tableLinks.length;

        return !isLoaderShown && hasTableLinks && showTable() && props.tableData.items.length > 10;
    }

    return (
        <div className="table-component">
            {props.isTablePage && !props.loader &&
                <div className="table-component-inner">
                    {showTopLinks() &&
                        <div className="standard-table-top">
                            {props.tableLinks.map((link, i) => {
                                return (
                                    <Link
                                        key={i}
                                        className={`btn ${link.class}`}
                                        to={link.href}
                                    >
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    }
                    {props.title && <h3>{props.title}</h3>}
                    <div className={`standard-table jumbotron ${props.tableClass}`}>
                        {!showTable() && props.message &&
                            <div className="table-message lead">
                                {props.message}
                            </div>
                        }
                        {showTable() &&
                            <table className="table">
                                <thead>
                                    <tr>
                                        {props.tableData.header.map((label, i) => {
                                            return (
                                                <th key={i} scope="col">{label}</th>
                                            );
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {props.tableData.items.map(item => {
                                        return (
                                            <tr key={item._id}>
                                                {Object.keys(item).map((field, z) => {
                                                    let cell;

                                                    if (field === '_id' || field === 'hidden') {
                                                        cell = null;
                                                    } else if (field === 'actions') {
                                                        cell = <td className="table-item-actions" key={z}>{item.actions.map((action, y) => action.link(y))}</td>;
                                                    } else {
                                                        cell = <td key={z}>{item[field] || '-'}</td>;
                                                    }

                                                    return cell;
                                                })}
                                                {Object.keys((cell, i) => {
                                                    return (
                                                        <td key={i}>{item[cell]}</td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            }
            {props.isTablePage && !props.loader && props.tableLinks && !!props.tableLinks.length &&
                <div className="standard-table-bottom">
                    {props.tableLinks.map((link, i) => {
                        return (
                            <Link
                                key={i}
                                className={`btn ${link.class}`}
                                to={link.href}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            }
        </div>
    );
};

