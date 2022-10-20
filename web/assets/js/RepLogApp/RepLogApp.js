import React, {Component} from 'react';
import RepLogs from "./RepLogs";
import PropTypes from "prop-types";
import {createRepLog, deleteRepLog, getRepLogs} from "../api/replog_api";


export default class RepLogApp extends Component {
    constructor(props) {
        super(props);
        this._handleRowClick = this._handleRowClick.bind(this);
        this._handleAddReplog = this._handleAddReplog.bind(this);
        this.flashMessageHandle = 0;

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
            this.setState({
                repLogs: data,
                isLoading: false,
            });
        });
    }

    componentWillUnmount() {
        // prevents callback if app is not rendered
        clearTimeout(this.flashMessageHandle);
    }

    _showFlashMessage(message) {
        this.setState({
            flashMessage: message,
        })
        clearTimeout(this.flashMessageHandle);
        this.flashMessageHandle = setTimeout(() => {
            this.setState({
                flashMessage: ''
            });
        }, 5000)

    }

    _handleRowClick(clickedRowId) {
        this.setState({
            highlightedRowId: clickedRowId,
        });
    }

    _handleAddReplog(itemKey, reps) {
        const savingCompleteState = {isSavingRepLog: false};
        this.setState({isSavingRepLog: true});
        const newItem = {
            reps: parseFloat(reps),
            item: itemKey,
        };

        createRepLog(newItem)
            .then((repLog) => {
                this._showFlashMessage('Replog lifted to database!');
                this.setState(previousState => ({
                    repLogs: [...previousState.repLogs, repLog],
                    ...savingCompleteState,
                    validationErrors: null,
                }));
            })
            .catch(error => {
                error.response.json().then(data => {
                    this.setState({
                        validationErrors: data.errors,
                        ...savingCompleteState
                    });
                })
            });
    }

    _handleDeleteReplog = (repLogId) => {
        this.setState((prevState) => {
            const replogs = prevState.repLogs.map(
                replog => replog.id !== repLogId ? replog : {...replog, isDeleting: true}
            );

            return {repLogs: replogs};
        })

        deleteRepLog(repLogId).then(() => {
            this.setState(prevState => (
                {
                    repLogs: prevState.repLogs.filter(repLog => repLog.id !== repLogId)
                }
            ));
        });
        this._showFlashMessage('Item was Un-lifted!');
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

RepLogApp.propTypes = {
    withHeart: PropTypes.bool,
    itemOptions: PropTypes.array
}

RepLogApp.defaultProps = {
    withHeart: true,
    itemOptions: []
}
