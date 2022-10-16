import React from 'react';
import PropTypes from "prop-types";

const calculateTotalReps = replogs => replogs.reduce(
    (total, replogItem) => total + replogItem.reps,
    0
)

const calculateTotalWeight = replogs => replogs.reduce(
    (total, replogItem) => total + replogItem.totalWeightLifted,
    0
)

export default function RepLogList(props) {
    const {highlightedRowId, rowClickedHandler, repLogs} = props;

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
                            <td>...</td>
                        </tr>
                    ))
            }
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
    repLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
}