import React, { Component } from 'react';
import Materialize from 'materialize-css';
import JsBarcode from 'jsbarcode';

class Placements extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInstance: null
        }

        this.showBarcodes = this.showBarcodes.bind(this);
    }

    componentDidMount() {
        let modalInstance = Materialize.Modal.init(this.barcodes);
        this.setState({ modalInstance });
        document.getElementById('store-home').classList.remove('active');
        document.getElementById('store-placements').classList.add('active');
        document.getElementById('store-products').classList.remove('active');
    }


    showBarcodes() {
        const { user } = this.props;

        if (this.state.modalInstance) {
            this.state.modalInstance.open();
        }

        if (user && user.store && user.store.placements) {
            user.store.placements.forEach((placement, index) => {
                JsBarcode(`#barcode${index}`, placement.id, { format: "CODE39", displayValue: true });
            });
        }
    }

    render() {
        const { user } = this.props;
        let store = null, placements = [];

        if (user) {
            store = user.store;

            if (store) {
                placements = store.placements;
            }
        }

        return (
            <div id="placements" className="ui container margin-top-10">
                {
                    store &&
                    <div className="col s12">
                        <div className="row margin-top-10">
                            <div className="col s12">
                                <a href='/createplacement' className="ui primary button">Add a Placement <i className="add icon"></i></a>
                                <button onClick={this.showBarcodes} className="ui primary button">Show Barcodes</button>
                            </div>
                            <div className="col s12 margin-top-10">
                                <div className="ui four doubling cards">
                                    {
                                        placements.map((placement, index) => {
                                            return <div key={index} className="card">
                                                <div className="image">
                                                    <img alt={placement.name} src={placement.photoURL} />
                                                </div>
                                                <div className="content">
                                                    <a href={`/placement/${placement._id}`} className="header">{placement.name}</a>
                                                    <div className="meta">{`Section: ${placement.section}`}</div>
                                                    <div className="meta">{`Aisle: ${placement.aisle}`}</div>
                                                    <div className="meta">{`Rack: ${placement.rack}`}</div>
                                                </div>
                                            </div>;
                                        })
                                    }
                                    {
                                        placements.length === 0 &&
                                        <div className="col s12 margin-top-10">
                                            <h2>Start creating placements and products</h2>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    !store &&
                    <div className="col s12">
                        <div className="row margin-top-10">
                            <h1>You have not created a store yet. <a href='/createstore' className="ui primary button">Create Store <i className="right arrow icon"></i></a> and Help your customers</h1>
                        </div>
                    </div>

                }
                <div ref={s => this.barcodes = s} className="modal full-width-responsive">
                    <div className="modal-content left-align">
                        <div className="ui cards col s12">
                            {
                                placements.map((placement, index) => {
                                    return <div key={index} className="card full-width">
                                        <div className="content">
                                            <div className="header">{placement.name}</div>
                                            <div className="meta">{placement.section} {placement.aisle} {placement.rack}</div>
                                            <div className="description">
                                                <svg width="0" height="0" className="margin-top-10 margin-bottom-10 full-width" id={`barcode${index}`}></svg>
                                            </div>
                                        </div>
                                    </div>;
                                })
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a className="btn modal-action modal-close waves-effect red waves-red">Cancel</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Placements;
