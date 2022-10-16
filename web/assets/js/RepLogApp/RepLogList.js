import React, {Component} from 'react';


const repLogs = [
    {id: 1, reps: 25, itemLabel: 'My Laptop', totalWeightLifted: 112.5},
    {id: 2, reps: 10, itemLabel: 'Big Fat Cat', totalWeightLifted: 180},
    {id: 8, reps: 4, itemLabel: 'Big Fat Cat', totalWeightLifted: 72}
];

export default class RepLogList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {highlightedRowId, rowClickedHandler} = this.props;

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
}
