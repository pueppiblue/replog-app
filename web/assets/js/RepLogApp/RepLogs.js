import React from 'react';
import RepLogList from "./RepLogList";
import PropTypes from "prop-types";

export default function RepLogs(props) {
    const {withHeart, highlightedRowId, rowClickedHandler, newItemSubmitHandler, repLogs} = props;

    function handleFormSubmit(event) {
        event.preventDefault();
        const itemName = event.target.elements.namedItem('rep_log_item').value;
        const reps = event.target.elements.namedItem('rep_log_reps').value;

        newItemSubmitHandler(itemName, reps);
    }

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

            <form
                className="form-inline"
                style={{display: "flex", justifyContent: "space-between"}}
                onSubmit={handleFormSubmit}
            >
                <div className="form-group">
                    <label className="sr-only control-label required" htmlFor="rep_log_item">
                        What did you lift?
                    </label>
                    <select id="rep_log_item"
                            name="item"
                            required="required"
                            className="form-control"
                            defaultValue={""}
                    >
                        <option value="">What did you lift?</option>
                        <option value="cat">Cat</option>
                        <option value="fat_cat">Big Fat Cat</option>
                        <option value="laptop">My Laptop</option>
                        <option value="coffee_cup">Coffee Cup</option>
                    </select>
                </div>

                <div className="form-group">
                    <label className="sr-only control-label required" htmlFor="rep_log_reps">
                        How many times?
                    </label>
                    <input type="number" id="rep_log_reps"
                           name="reps" required="required"
                           placeholder="How many times?"
                           className="form-control" />
                </div>

                <button type="submit" className="btn btn-primary">I Lifted it!</button>
            </form>

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
