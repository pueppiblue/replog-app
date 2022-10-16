import React from 'react';
import RepLogList from "./RepLogList";
import RepLogCreator from "./RepLogCreator";
import PropTypes from "prop-types";

export default function RepLogs(props) {
    const {withHeart, highlightedRowId, rowClickedHandler, newItemSubmitHandler, repLogs} = props;

    return (
        <div className="col-md-7 js-rep-log-table">
            <h2>
                Lift History
                {withHeart ? <span>❤️</span> : ''}
                !
            </h2>

            <RepLogList
                highlightedRowId={highlightedRowId}
                rowClickedHandler={rowClickedHandler}
                repLogs={repLogs}
            />

            <RepLogCreator
                newItemSubmitHandler={newItemSubmitHandler}
            />
        </div>
    );
}

RepLogs.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    rowClickedHandler: PropTypes.func.isRequired,
    newItemSubmitHandler: PropTypes.func.isRequired,
    repLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
}
