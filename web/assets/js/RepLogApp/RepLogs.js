import React from 'react';
import RepLogList from "./RepLogList";
import RepLogCreator from "./RepLogCreator";
import PropTypes from "prop-types";

export default function RepLogs(props) {
    const {
        withHeart,
        highlightedRowId,
        rowClickedHandler,
        repLogAddHandler,
        heartCountHandler,
        repLogs,
        numberOfHearts
    } = props;

    return (
        <div className="col-md-7 js-rep-log-table">
            <input
                type="range"
                value={numberOfHearts}
                onChange={(e) => heartCountHandler(parseInt(e.target.value) || 0)}
            />
            <h2>
                Lift History
                {withHeart ? <span>{'❤️'.repeat(numberOfHearts)}</span> : ''}
                !
            </h2>

            <RepLogList
                highlightedRowId={highlightedRowId}
                rowClickedHandler={rowClickedHandler}
                repLogs={repLogs}
            />

            <RepLogCreator
                repLogAddHandler={repLogAddHandler}
            />
        </div>
    );
}

RepLogs.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    rowClickedHandler: PropTypes.func.isRequired,
    repLogAddHandler: PropTypes.func.isRequired,
    heartCountHandler: PropTypes.func.isRequired,
    repLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
    numberOfHearts: PropTypes.number.isRequired,
}
