import React, {Component} from 'react';

export default class RepLogApp extends Component {
    render() {
        let heart = this.props.withHeart ? <span>❤</span> : '';

        return (
            <h2>
                <span>Lift History 33!</span>
                {heart}
            </h2>
        );
    }
}
