import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class RepLogCreator extends Component {
    constructor(props) {
        super(props);

        this._handleFormSubmit = this._handleFormSubmit.bind(this);
        this.quantityInput = React.createRef();
        this.itemSelect = React.createRef();
    }

    _handleFormSubmit(event) {
        event.preventDefault();

        const {repLogAddHandler} = this.props;
        const quantityInput = this.quantityInput.current;
        const itemSelect = this.itemSelect.current;
        const reps = quantityInput.value;
        const itemName = itemSelect.options[itemSelect.selectedIndex].text;

        repLogAddHandler(itemName, reps);

        quantityInput.value = '';
        itemSelect.selectedIndex = 0;
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
                            ref={this.itemSelect}
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
                    <input type="number"
                           id="rep_log_reps"
                           ref={this.quantityInput}
                           required="required"
                           placeholder="How many times?"
                           className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">I Lifted it!</button>
            </form>
        );
    }
}

RepLogCreator.propTypes = {
    repLogAddHandler: PropTypes.func.isRequired,
}
