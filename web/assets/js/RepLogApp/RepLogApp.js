import React, {Component} from 'react';

const repLogs = [
    {id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5},
    {id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180},
    {id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72}
];

export default class RepLogApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null,
        };
    }

    render() {
        const {withHeart} = this.props;
        const {highlightedRowId} = this.state;

        return (
            <div className="col-md-7 js-rep-log-table">
                <h2>
                    Lift History
                    {withHeart}
                    !
                </h2>

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
}
