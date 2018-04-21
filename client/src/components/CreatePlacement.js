import React, { Component } from 'react';
import API from '../utils/API';
import JsBarcode from 'jsbarcode';
import Modal from '../components/Modal';


class CreatePlacement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: `Organic Produce Section Aisle ${props.placementsLength + 1}`,
            description: `This section has a variety of Organic Produce`,
            aisle: `A${props.placementsLength + 1}`,
            section: `Organic Produce`,
            rack: `R${props.placementsLength + 1}`,
            photoURL: 'https://annieriedora.files.wordpress.com/2012/06/newest-garden-and-field-day-prep-stuff-037.jpg',
            error: null            
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generateBarcode = this.generateBarcode.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);        
    }

    handleModalClose() {
        this.setState({ error: null });
    }

    componentDidMount() {
        document.getElementById('store-home').classList.remove('active');        
    }

    handleChange(event) {
        const state = {

        };
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    generateBarcode() {
        if (this.state.section && this.state.aisle && this.state.rack) {
            const code = JsBarcode("#barcode",
                `${this.state.section.slice(0, 3)}${this.state.aisle.slice(0, 3)}${this.state.rack.slice(0, 3)}`, { format: "CODE39", displayValue: true });
            this.setState({ id: code._encodings[0][0].text });
        }
    }

    handleOnSubmit(event) {
        event.preventDefault();
        if (this.state.id) {
            const placementData = {
                id: this.state.id,
                name: this.state.name,
                store: this.props.storeId,
                description: this.state.description,
                aisle: this.state.aisle,
                section: this.state.section,
                rack: this.state.rack,
                photoURL: this.state.photoURL
            };

            API.savePlacement(placementData).then(() => {
                window.location = '/';
            }).catch((errorDetails) => {
                this.setState({ error: { message: "Something went wrong! Please try later" } });
            });
        } else {
            this.setState({ error: { message: "Placemet barcode is required! Click Generate Barcode." } });
        }
    }

    render() {
        return (
            <div className="ui container margin-top-10">
                <form className="ui form" onSubmit={this.handleOnSubmit} >
                    <div className="field">
                        <label>Name of the Placement</label>
                        <input onChange={this.handleChange} type="text" value={this.state.name} name="name" placeholder="Name of the placement" />
                    </div>
                    <div className="field">
                        <label>Description of the Placement</label>
                        <input onChange={this.handleChange} type="text" value={this.state.description} name="description" placeholder="Description of the placement" />
                    </div>
                    <div className="field">
                        <label>Section of the Placement</label>
                        <input onChange={this.handleChange} type="text" value={this.state.section} name="section" placeholder="Section of the placement" />
                    </div>
                    <div className="field">
                        <label>Aisle of the Placement</label>
                        <input onChange={this.handleChange} type="text" value={this.state.aisle} name="aisle" placeholder="Aisle of the placement" />
                    </div>
                    <div className="field">
                        <label>Rack of the Placement</label>
                        <input onChange={this.handleChange} type="text" value={this.state.rack} name="rack" placeholder="Rack of the placement" />
                    </div>
                    <div className="field">
                        <label>Image link of the Placement</label>
                        <input onChange={this.handleChange} type="text" value={this.state.photoURL} name="photoURL" placeholder="Image link of the Placement" />
                    </div>
                    <div className="field pos-rel">
                        <label>Generated Barcode</label>
                        <input readOnly type="text" value={this.state.id} name="id" placeholder="Generate ID Once All the data is filled" />
                        <svg width="0" height="0" className="margin-top-10 margin-bottom-10" id="barcode"></svg>
                        <button className="ui button pos-abs generate-barcode" onClick={this.generateBarcode} type="button">Generate Barcode</button>
                    </div>
                    <button className="btn waves-effect waves-light" type="submit">Submit</button>
                </form>
                {
                    this.state.error &&
                    <Modal onClose={this.handleModalClose} heading="Error" buttonName="Ok" content={this.state.error.message} show={true} />
                }
            </div>
        );
    }
}

export default CreatePlacement;
