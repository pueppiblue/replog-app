import React, {Component} from 'react';
import PropTypes from "prop-types";

export default class RepLogCreator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quantityInputError: '',
            quantity: 0,
            selectedItemId: '',
        };

        this.itemOptions = [
            {id: 'cat', text: 'Cat'},
            {id: 'fat_cat', text: 'Big Fat Cat'},
            {id: 'laptop', text: 'My Laptop'},
            {id: 'coffee_cup', text: 'Coffee Cup'},
        ];
    }

    _isQuantiyValid(quantity) {
        this.setState({quantityInputError: quantity <= 0 ? 'Please enter a value greater than 0' : ''});

        return quantity > 0;
    }

    handleQuantityChange = (event) => {
        this.setState({quantity: event.target.value});
    }

    handleSelectedItemChange = (event) => {
        this.setState({selectedItemId: event.target.value});
    }

    _handleFormSubmit = (event) => {
        event.preventDefault();

        const {repLogAddHandler} = this.props;
        const {selectedItemId, quantity} = this.state;

        if (!this._isQuantiyValid(quantity)) {
            return;
        }

        repLogAddHandler(selectedItemId, quantity);

        this.setState({
            quantityValue: 0,
            selectedItemId: '',
        });
    }


    render() {
        const {quantityInputError, quantity, selectedItemId} = this.state;

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
                            value={selectedItemId}
                            onChange={this.handleSelectedItemChange}
                            required="required"
                            className="form-control"
                    >
                        <option value="">What did you lift?</option>
                        {this.itemOptions.map(option => {
                            return (
                                <option
                                    key={option.id}
                                    value={option.id}
                                >
                                    {option.text}
                                </option>
                            );
                        })}
                    </select>
                </div>

                <div className={`form-group ${quantityInputError ? 'has-error' : ''}`}>
                    <label className="sr-only control-label required" htmlFor="rep_log_reps">
                        How many times?
                    </label>
                    <input
                        type="number"
                        id="rep_log_reps"
                        value={quantity}
                        onChange={this.handleQuantityChange}
                        required="required"
                        placeholder="How many times?"
                        className="form-control"
                    />
                    {quantityInputError && <span className="help-block">{quantityInputError}</span>}
                </div>

                <button type="submit" className="btn btn-primary">I Lifted it!</button>
            </form>
        );
    }
}

RepLogCreator.propTypes = {
    repLogAddHandler: PropTypes.func.isRequired,
}
