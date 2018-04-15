import React, { Component } from 'react';
import API from '../utils/API';
import JsBarcode from 'jsbarcode';

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
            photoURL: 'https://ars.els-cdn.com/content/image/1-s2.0-S002243590400003X-gr3.jpg'
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generateBarcode = this.generateBarcode.bind(this);
    }


    componentDidMount() {
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
                `${this.state.section.slice(0,3)}${this.state.aisle.slice(0,3)}${this.state.rack.slice(0,3)}`, { format: "CODE39", displayValue: true });
            this.setState({id: code._encodings[0][0].text});
        }
    }

    handleOnSubmit(event) {
        event.preventDefault();
        if (this.state.id) {
            const productData = {
                id: this.state.id,
                name: this.state.name,
                store: this.props.storeId,
                description: this.state.description,
                aisle: this.state.aisle,
                section: this.state.section,
                rack: this.state.rack,
                photoURL: this.state.photoURL
            };

            API.savePlacement(productData).then(() => {
                window.location = '/';
            });
        }
    }

    render() {
        return (
            <div className="lime darken-1">
                <div className="ui vertical masthead aligned segment">
                    <div className="ui container full-height pos-rel">
                        <div className="ui grid">
                            <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
                                <form className="ui form" onSubmit={this.handleOnSubmit} >
                                    <div className="field">
                                        <label>Name of the Placement</label>
                                        <input onChange={this.handleChange} type="text" value={this.state.name} name="name" placeholder="Name of the product" />
                                    </div>
                                    <div className="field">
                                        <label>Description of the Placement</label>
                                        <input onChange={this.handleChange} type="text" value={this.state.description} name="description" placeholder="Description of the product" />
                                    </div>
                                    <div className="field">
                                        <label>Section of the Placement</label>
                                        <input onChange={this.handleChange} type="text" value={this.state.section} name="section" placeholder="Section of the product" />
                                    </div>
                                    <div className="field">
                                        <label>Aisle of the Placement</label>
                                        <input onChange={this.handleChange} type="text" value={this.state.aisle} name="aisle" placeholder="Aisle of the product" />
                                    </div>
                                    <div className="field">
                                        <label>Rack of the Placement</label>
                                        <input onChange={this.handleChange} type="text" value={this.state.rack} name="rack" placeholder="Rack of the product" />
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreatePlacement;
