import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class RepLogCreator extends Component {
    constructor(props) {
        super(props);

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
    }

    _handleFormSubmit(event) {
        event.preventDefault();

        const { newItemSubmitHandler } = this.props;
        const itemName = event.target.elements.namedItem('rep_log_item').value;
        const reps = event.target.elements.namedItem('rep_log_reps').value;

        newItemSubmitHandler(itemName, reps);
    }


    render() {

        return (
            <form
                className="form-inline"
                style={{display: "flex", justifyContent: "space-between"}}
                onSubmit={this._handleFormSubmit}
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
        );
    }
}

RepLogCreator.propTypes = {
    newItemSubmitHandler: PropTypes.func.isRequired,
}
