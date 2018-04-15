import React, { Component } from 'react';
import API from '../utils/API';
import Materialize from 'materialize-css';
import SEScanner from './SEScanner';

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: `ORGA1R${props.productsLength + 1}`,
            name: `Organic Product ${props.productsLength + 1}`,
            price: '15',
            keywords: [],
            placements: ['5ad309d3baa96b4140e3b8c8', '5ad309f5baa96b4140e3b8c9'],
            photoURL: 'https://www.ocado.com/productImages/653/65353011_0_640x640.jpg?identifier=60f2512e90321b2b2790b14af220ba86'
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnScanned = this.handleOnScanned.bind(this);
        this.handleOnPlacementScanned = this.handleOnPlacementScanned.bind(this);
        this.handleAddPlacement = this.handleAddPlacement.bind(this);
    }


    componentDidMount() {
        let elem = document.querySelector('.chips');
        const options = {
            placeholder: 'Enter a Keyword',
            secondaryPlaceholder: 'Add more Keywords',
            data: [{
                tag: 'organic',
            }, {
                tag: `product ${this.props.productsLength + 1}`,
            }]
        }

        this.keywordsInstance = Materialize.Chips.init(elem, options);
    }

    handleChange(event) {
        const state = {

        };
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleOnScanned(id) {
        this.setState({ id });
    }

    handleOnPlacementScanned(id, index) {
        const { placements } = this.state;
        debugger;
        const dbPlacement = this.props.placements.filter(p => p.id === id);
        if (dbPlacement && dbPlacement.length) {
            placements[index] = dbPlacement[0]._id;
            this.setState({ placements });
        }
    }

    handleAddPlacement() {
        const { placements } = this.state;
        placements.push('');
        this.setState({ placements })
    }

    handleOnSubmit(event) {
        event.preventDefault();
        const keywords = this.keywordsInstance.chipsData.map(keyword => keyword.tag);
        if (this.state.id) {
            const productData = {
                id: this.state.id,
                name: this.state.name,
                store: this.props.storeId,
                price: this.state.price,
                keywords: keywords,
                placements: this.state.placements,
                photoURL: this.state.photoURL
            };

            API.saveProduct(productData).then(() => {
                window.location = '/';
            });
        }
    }

    render() {
        const { placements } = this.state;

        return (
            <div className="lime darken-1">
                <div className="ui vertical masthead aligned segment">
                    <div className="ui container full-height pos-rel">
                        <div className="ui grid">
                            <div className="column">
                                <form className="ui form" onSubmit={this.handleOnSubmit} >
                                    <div className="field">
                                        <label>Name of the Product</label>
                                        <input onChange={this.handleChange} type="text" value={this.state.name} name="name" placeholder="Name of the product" />
                                    </div>
                                    <div className="field">
                                        <label>Bar code ID</label>
                                        <SEScanner value={this.state.id} placeholder="Product Bar Code" onScanned={this.handleOnScanned} />
                                    </div>
                                    <div className="field">
                                        <label>Price</label>
                                        <input onChange={this.handleChange} type="number" value={this.state.price} name="price" placeholder="Price" />
                                    </div>
                                    <div className="field">
                                        <label>Keywords</label>
                                        <div className="chips chips-autocomplete">
                                            <input type="text" name="keywords" />
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>Image link of the Product</label>
                                        <input onChange={this.handleChange} type="text" value={this.state.photoURL} name="photoURL" placeholder="Image link of the Product" />
                                    </div>
                                    <div className="field">
                                        <label>Placements</label>
                                        {
                                            placements.map((placement, index) => {
                                                return <div key={index} className="field">
                                                    <SEScanner placeholder="Placement Bar Code" value={placement} index={index} onScanned={this.handleOnPlacementScanned} />
                                                </div>;
                                            })
                                        }
                                        <button className="ui button" onClick={this.handleAddPlacement} type="button">Add Another Placement</button>
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

export default CreateProduct;
