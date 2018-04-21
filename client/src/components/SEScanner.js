import React, { Component } from 'react';
import * as ScanditSDK from "scandit-sdk";
import ScannerKey from '../config/ScannerKey';
import Materialize from 'materialize-css';


class SEScanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalInstance: null
        }

        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnClose = this.handleOnClose.bind(this);
    }

    handleOnClick() {
        if (this.state.modalInstance) {
            this.state.modalInstance.open();
            if (!this.barcodePicker) {
                ScanditSDK.BarcodePicker.create(this.barCodeScanner, {
                    playSoundOnScan: true,
                    vibrateOnScan: true
                }).then((barcodePicker) => {
                    this.barcodePicker = barcodePicker;
                    var scanSettings = new ScanditSDK.ScanSettings({
                        enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
                        codeDuplicateFilter: 1000
                    });
                    this.barcodePicker.applyScanSettings(scanSettings);
                    this.barcodePicker.onScan((scanResult) => {
                        this.props.onScanned(scanResult.barcodes.reduce((string, barcode) => {
                            return barcode.data;
                        }, ""), this.props.index);
                        this.handleOnClose();
                    });
                });
            }
        }
    }

    handleOnClose() {
        if (this.state.modalInstance) {
            this.barcodePicker.destroy();
            this.barcodePicker = null;
            this.state.modalInstance.close();
        }
    }

    componentDidMount() {
        ScanditSDK.configure(ScannerKey, {
            engineLocation: "/",
            preloadEngineLibrary: false,
            preloadCameras: false
        })

        let modalInstance = Materialize.Modal.init(this.scannerModal);
        this.setState({ modalInstance });
    }

    render() {
        return (
            <div>
                <div className="field pos-rel">
                    <input required type="text" readOnly value={this.props.value} placeholder={this.props.placeholder} />
                    <button className="btn waves-effect waves-light pos-abs scandit" onClick={this.handleOnClick} type="button" name="action"><i className="material-icons">camera_enhance</i></button>
                </div>
                <div ref={s => this.scannerModal = s} className="modal full-width-responsive">
                    <div ref={s => this.barCodeScanner = s} className="modal-content left-align">
                    </div>
                    <div className="modal-footer">
                        <a className="btn modal-action modal-close waves-effect red waves-red">Cancel</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default SEScanner;
