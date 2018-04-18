import React, { Component } from 'react';
import Materialize from 'materialize-css';

class Modal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInstance: null
        }

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    open() {
        if (this.state.modalInstance) {
            this.state.modalInstance.open();
        }
    }

    close() {
        if (this.state.modalInstance) {
            this.state.modalInstance.close();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.show) {
            this.open();
        } else {
            this.close();
        }
    }

    componentDidMount() {
        let modalInstance = Materialize.Modal.init(document.getElementById('seModal'));
        this.setState({ modalInstance });
        if (this.props.show) {
            modalInstance.open();
        }
    }

    render() {
        return (
            <div id="seModal" className="modal">
                <div className="modal-content left-align">
                    <h4>{this.props.heading}</h4>
                    <p>{this.props.content}</p>
                </div>
                <div className="modal-footer">
                    <a className="btn modal-action modal-close waves-effect red waves-red">{this.props.buttonName}</a>
                </div>
            </div>
        );
    }
}

export default Modal;
