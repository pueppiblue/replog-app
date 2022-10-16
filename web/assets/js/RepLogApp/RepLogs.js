import React from 'react';
import RepLogList from "./RepLogList";

export default function RepLogs(props) {
    const {withHeart, highlightedRowId, rowClickedHandler} = props;

    return (
        <div className="col-md-7 js-rep-log-table">
            <h2>
                Lift History
                {withHeart}
                !
            </h2>

            <RepLogList
                highlightedRowId={highlightedRowId}
                rowClickedHandler={rowClickedHandler}
            />

            <form className="form-inline" style={{display: "flex", justifyContent: "space-between"}}>
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
