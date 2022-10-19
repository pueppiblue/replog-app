import React from 'react';
import PropTypes from "prop-types";

export default function RepLogList(props) {
    const {
        highlightedRowId,
        rowClickedHandler,
        repLogs,
        repLogDeleteHandler,
        isLoading,
        isSavingRepLog
    } = props;

    if (isLoading) {
        return (
            <table className="table table-striped">
                <tbody>
                <tr>
                    <td colSpan="4" className="text-center">Loading...</td>
                </tr>
                </tbody>
            </table>
        );
    }

    const calculateTotalReps = replogs => replogs.reduce(
        (total, replogItem) => total + replogItem.reps,
        0
    )

    const calculateTotalWeight = replogs => replogs.reduce(
        (total, replogItem) => total + replogItem.totalWeightLifted,
        0
    )

    const _handleDeleteClick = function (event, repLogId) {
        event.preventDefault();

        repLogDeleteHandler(repLogId);
    }

    return (
        <table className="table table-striped">
            <thead>
            <tr>
                <th>What</th>
                <th>How many times?</th>
                <th>Weight</th>
                <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
            {
                repLogs.map((replog) =>
                    (
                        <tr
                            key={replog.id}
                            className={replog.id === highlightedRowId ? 'info' : ''}
                            onClick={() => rowClickedHandler(replog.id)}
                        >
                            <td>{replog.itemLabel}</td>
                            <td>{replog.reps}</td>
                            <td>{replog.totalWeightLifted}</td>
                            <td>
                                <a href="#">
                                    <span
                                        className="fa fa-trash"
                                        onClick={(event) => _handleDeleteClick(event, replog.id)}
                                    />
                                </a>
                            </td>
                        </tr>
                    ))
            }
            {isSavingRepLog && (
                <tr>
                    <td
                        colSpan="4"
                        className="text-center"
                        style={{
                            opacity: 0.5,
                        }}
                    >
                        Lifting to the database ...
                    </td>
                </tr>
            )}
            </tbody>
            <tfoot>
            <tr>
                <td>&nbsp;</td>
                <th>{calculateTotalReps(repLogs)}</th>
                <td>{calculateTotalWeight(repLogs)}</td>
            </tr>
            </tfoot>
        </table>
    );
}

RepLogList.propTypes = {
    highlightedRowId: PropTypes.any,
    rowClickedHandler: PropTypes.func.isRequired,
    repLogDeleteHandler: PropTypes.func.isRequired,
    repLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSavingRepLog: PropTypes.bool.isRequired,
}
