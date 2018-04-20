import React, { Component } from 'react';
import API from '../utils/API';
import { withRouter } from 'react-router';
import JsBarcode from 'jsbarcode';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placements: [],
            product: {
                keywords: []
            }
        }
    }

    componentDidMount() {
        API.getProduct(this.props.match.params.id).then(product => {
            if (product && product.data) {
                this.setState({ product: product.data, placements: product.data.placements });
                if (product.data.id) {
                    JsBarcode("#barcode", product.data.id, { format: "CODE39", displayValue: true });
                }
            }
        });
        document.getElementById('store-home').classList.remove('active');
    }

    render() {
        const { placements, product } = this.state;
        return (
            <div className="ui container margin-top-10">
                <form className="ui form" >
                    <div className="field">
                        <label>This Product is placed in these locations</label>
                    </div>
                    <div className="ui four doubling cards">
                        {
                            placements.map((placement, index) => {
                                return <div key={index} className="card">
                                    <div className="content">
                                        <div className="header"><a href={`/placement/${placement._id}`} className="header">{placement.name}</a></div>
                                        <div className="meta">{`Section: ${placement.section}`}</div>
                                        <div className="meta">{`Aisle: ${placement.aisle}`}</div>
                                        <div className="meta">{`Rack: ${placement.rack}`}</div>
                                        <div className="description">
                                            <p>{placement.description}</p>
                                        </div>
                                    </div>
                                    <div className="extra content">
                                        <img className="full-height full-width" alt={placement.name} src={placement.photoURL} />
                                    </div>
                                </div>;
                            })
                        }
                    </div>
                    <div className="field">
                        <label>Name: </label>
                        <input readOnly value={product.name} />
                    </div>
                    <div className="field pos-rel">
                        <label>Barcode of the Product</label>
                        <svg width="0" height="0" className="margin-top-10 margin-bottom-10" id="barcode"></svg>
                    </div>
                    <div className="field">
                        <label>Price</label>
                        <input readOnly value={product.price} />
                    </div>
                    <div className="field">
                        <label>Keywords</label>
                        <div className="chips">
                            {
                                product.keywords.map((keyword, index) => {
                                    return <div key={index} class="chip" tabindex="0">{keyword}</div>
                                })
                            }
                        </div>
                    </div>
                    <div className="field">
                        <label>Product Image: </label>
                        <img alt={product.name} className="full-height full-width" src={product.photoURL} />
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(Product);
