import React, {Component} from 'react';
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import {v4 as uuid} from 'uuid';
import {getRepLogs} from "../api/replog_api";


export default class RepLogApp extends Component {
    constructor(props) {
        super(props);
        this._handleRowClick = this._handleRowClick.bind(this);
        this._handleAddReplog = this._handleAddReplog.bind(this);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 0,
        };
    }

    componentDidMount() {
        getRepLogs().then(data => {
            this.setState({repLogs: data});
        });
    }

    _handleRowClick(clickedRowId) {
        this.setState({
            highlightedRowId: clickedRowId,
        });
    }

    _handleAddReplog(itemName, reps) {
        const newItem = {
            id: uuid(),
            reps: parseFloat(reps),
            itemLabel: itemName,
            totalWeightLifted: Math.floor(Math.random() * 50)
        };

        this.setState(previousState => ({repLogs: [...previousState.repLogs, newItem]}));
    }

    _handleDeleteReplog = (repLogId) => {
        this.setState(prevState => (
            {
                repLogs: prevState.repLogs.filter(repLog => repLog.id !== repLogId)
            }
        ));
    }

    _handleHeartCount = (heartCount) => {
        this.setState({numberOfHearts: heartCount});
    };


    render() {
        return (
            <RepLogs
                {...this.props}
                {...this.state}
                rowClickedHandler={this._handleRowClick}
                repLogAddHandler={this._handleAddReplog}
                heartCountHandler={this._handleHeartCount}
                repLogDeleteHandler={this._handleDeleteReplog}
            />
        );
    }
}

RepLogApp
    .propTypes = {
    withHeart: PropTypes.bool,
}
