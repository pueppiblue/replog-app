import React, {Component} from 'react';
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import {v4 as uuid} from 'uuid';

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null,
            repLogs: [
                {id: uuid(), reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5},
                {id: uuid(), reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180},
                {id: uuid(), reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72}
            ]
        };
    }

    _handleRowClick(clickedRowId) {
        this.setState({
            highlightedRowId: clickedRowId,
        });
    }

    _handleNewItemSubmit(itemName, reps) {
        const newItem = {
            id: uuid(),
            reps: parseFloat(reps),
            itemLabel: itemName,
            totalWeightLifted: Math.floor(Math.random() * 50)
        };

        this.setState({repLogs: [...this.state.repLogs, newItem]});
    }

    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                rowClickedHandler={this._handleRowClick.bind(this)}
                newItemSubmitHandler={this._handleNewItemSubmit.bind(this)}
            />
        );
    }
}

RepLogApp
    .propTypes = {
    withHeart: PropTypes.bool,
}
