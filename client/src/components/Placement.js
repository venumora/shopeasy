import React, { Component } from 'react';
import API from '../utils/API';
import { withRouter } from 'react-router';
import JsBarcode from 'jsbarcode';


class Placement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placement: []
        }
    }

    componentDidMount() {
        API.getPlacement(this.props.match.params.id).then(placement => {
            if (placement && placement.data) {
                this.setState({ placement: placement.data });
            }
        });
        document.getElementById('store-home').classList.remove('active');
    }

    componentDidUpdate() {
        const { placement } = this.state;

        if (placement.id) {
            JsBarcode("#barcode", placement.id, { format: "CODE39", displayValue: true });
        }
    }

    render() {
        const { placement } = this.state;
        return (
            <div className="ui container margin-top-10">
                <form className="ui form" >
                    <div className="field pos-rel">
                        <label>Barcode of the Placement</label>
                        <svg width="0" height="0" className="margin-top-10 margin-bottom-10" id="barcode"></svg>
                    </div>
                    <div className="field">
                        <label>Name:</label>
                        <input readOnly type="text" value={placement.name} name="name" />
                    </div>
                    <div className="field">
                        <label>Description:</label>
                        <input readOnly type="text" value={placement.description} name="description" />
                    </div>
                    <div className="field">
                        <label>Section:</label>
                        <input readOnly type="text" value={placement.section} name="section" />
                    </div>
                    <div className="field">
                        <label>Aisle:</label>
                        <input readOnly type="text" value={placement.aisle} name="aisle" />
                    </div>
                    <div className="field">
                        <label>Rack:</label>
                        <input readOnly type="text" value={placement.rack} name="rack" />
                    </div>
                    <div className="field">
                        <label>Layout Image:</label>
                        <img className="full-height full-width" alt={placement.name} src={placement.photoURL} />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Placement);
