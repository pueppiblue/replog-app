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
            isLoading: true,
        };
    }

    componentDidMount() {
        getRepLogs().then(data => {
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
        const newItem = {
            reps: parseFloat(reps),
            item: itemKey,
        };

        createRepLog(newItem).then((repLog) => {
            this.setState(previousState => ({
                repLogs: [...previousState.repLogs, repLog]
            }));
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
