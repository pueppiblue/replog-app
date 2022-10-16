import React, {Component} from 'react';

const repLogs = [
    {id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5},
    {id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180},
    {id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72}
];

const repLogElements = repLogs.map((replog) => {
    return (
        <tr>
            <td>{replog.itemLabel}</td>
            <td>{replog.reps}</td>
            <td>{replog.totalWeightLifted}</td>
            <td>...</td>
        </tr>
    )
});

export default class RepLogApp extends Component {
    render() {
        let heart = this.props.withHeart ? <span>❤</span> : '';

        return (
            <div className="col-md-7 js-rep-log-table">
                <h2>
                    Lift History
                    {heart}
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
                    <tr>
                        <td>Big Fat Cat</td>
                        <td>10</td>
                        <td>180</td>
                        <td>...</td>
                    </tr>
                    {repLogElements}
                    </tbody>
                    <tfoot>
                    <tr>
                        <td>&nbsp;</td>
                        <th>TODO total</th>
                        <td>&nbsp;</td>
                    </tr>
                    </tfoot>
                </table>

            </div>
        );
    }
}
