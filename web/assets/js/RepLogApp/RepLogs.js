import React from 'react';
import RepLogList from "./RepLogList";
import RepLogCreator from "./RepLogCreatorControlledComponent";
import PropTypes from "prop-types";

export default function RepLogs(props) {
    const {
        withHeart,
        highlightedRowId,
        rowClickedHandler,
        repLogAddHandler,
        repLogDeleteHandler,
        heartCountHandler,
        repLogs,
        numberOfHearts,
        isLoading,
        isSavingRepLog,
        flashMessage,
        validationErrors,
        itemOptions
    } = props;

    return (
        <div className="js-rep-log-table">
            <input
                type="range"
                value={numberOfHearts}
                onChange={(e) => heartCountHandler(parseInt(e.target.value) || 0)}
            />

            {flashMessage && (
                <div className="alert alert-success text-center">
                    {flashMessage}
                </div>
            )}

            <h2>
                Lift History
                {withHeart ? <span>{'❤️'.repeat(numberOfHearts)}</span> : ''}
                !
            </h2>

            <RepLogList
                highlightedRowId={highlightedRowId}
                rowClickedHandler={rowClickedHandler}
                repLogs={repLogs}
                repLogDeleteHandler={repLogDeleteHandler}
                isLoading={isLoading}
                isSavingRepLog={isSavingRepLog}
            />

            <RepLogCreator
                repLogAddHandler={repLogAddHandler}
                validationErrors={validationErrors}
                itemOptions={itemOptions}
            />
        </div>
    );
}

RepLogs.propTypes = {
    withHeart: PropTypes.bool,
    highlightedRowId: PropTypes.any,
    rowClickedHandler: PropTypes.func.isRequired,
    repLogAddHandler: PropTypes.func.isRequired,
    repLogDeleteHandler: PropTypes.func.isRequired,
    heartCountHandler: PropTypes.func.isRequired,
    repLogs: PropTypes.arrayOf(PropTypes.object).isRequired,
    numberOfHearts: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isSavingRepLog: PropTypes.bool.isRequired,
    flashMessage: PropTypes.string.isRequired,
    validationErrors: PropTypes.object,
    itemOptions: PropTypes.array.isRequired,
}
