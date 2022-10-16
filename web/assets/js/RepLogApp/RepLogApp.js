import React, {Component} from 'react';
import RepLogs from "./RepLogs";


export default class RepLogApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            highlightedRowId: null,
        };
    }

    _handleRowClick(clickedRowId) {
        this.setState({
            highlightedRowId: clickedRowId,
        });
    }

    render() {
        const {withHeart} = this.props;
        const {highlightedRowId} = this.state;

        return (
            <RepLogs
                withHeart={withHeart}
                highlightedRowId={highlightedRowId}
                rowClickedHandler={this._handleRowClick.bind(this)}
            />
        );
    }
}
