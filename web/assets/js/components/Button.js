import React from 'react';
import PropTypes from 'prop-types';

export default function Button(props) {
    const {className, ...restProps} = props;

    return (
        <button
            className={`btn ${props.className}`}
            {...restProps}
        >
            {props.children}
        </button>
    );
}

Button.propTypes = {
    label: PropTypes.string.isRequired,
    children: PropTypes.any,
    className: PropTypes.string,
}

Button.defaultProps = {
    className: '',
}


