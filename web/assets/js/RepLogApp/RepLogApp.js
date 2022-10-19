import React, {Component} from 'react';
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import {createRepLog, deleteRepLog, getRepLogs} from "../api/replog_api";


export default class RepLogApp extends Component {
    constructor(props) {
        super(props);
        this._handleRowClick = this._handleRowClick.bind(this);
        this._handleAddReplog = this._handleAddReplog.bind(this);

        this.state = {
            highlightedRowId: null,
            repLogs: [],
            numberOfHearts: 0,
            isLoading: false,
            isSavingRepLog: false,
            flashMessage: '',
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        getRepLogs().then(data => {
            // timeout for demonstration purpose
            setTimeout(() => {
                this.setState({
                    repLogs: data,
                    isLoading: false,
                });
            }, 1000);
        });
    }

    _handleRowClick(clickedRowId) {
        this.setState({
            highlightedRowId: clickedRowId,
        });
    }

    _handleAddReplog(itemKey, reps) {
        this.setState({isSavingRepLog: true});
        const newItem = {
            reps: parseFloat(reps),
            item: itemKey,
        };

        createRepLog(newItem).then((repLog) => {
            setTimeout(() => {
                this.setState(previousState => ({
                    repLogs: [...previousState.repLogs, repLog],
                    isSavingRepLog: false,
                    flashMessage: 'Replog lifted to database!'
                }));
            }, 1000);
        });


    }

    _handleDeleteReplog = (repLogId) => {
        deleteRepLog(repLogId).then(() => {
            this.setState(prevState => (
                {
                    repLogs: prevState.repLogs.filter(repLog => repLog.id !== repLogId)
                }
            ));
        });
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
