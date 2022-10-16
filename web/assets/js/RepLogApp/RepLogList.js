import React from 'react';
import PropTypes from "prop-types";

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
                <th>TODO total</th>
                <td>&nbsp;</td>
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
