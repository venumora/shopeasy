import React, { Component } from 'react';
import API from '../utils/API';
import { withRouter } from 'react-router';

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchKey: '',
            store: '',
            storeData: {},
            isSearch: false
        }

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        const state = {
        };
        const value = event.target.value.trim();

        if (!value || value.length > 2) {
            API.getProducts(this.state.store, value || 'all').then(products => {
                if (products && products.data) {
                    this.setState({ products: products.data, isSearch: true });
                }
            });
        }

        state[event.target.name] = value;
        this.setState(state);
    }

    componentDidMount() {
        API.getStore(this.props.match.params.id).then(store => {
            if (store && store.data) {
                this.setState({
                    products: store.data.products,
                    store: store.data._id,
                    storeData: store.data,
                });
            }
        });
    }

    render() {
        const { products, storeData, isSearch } = this.state;
        return (
            <div className="ui container margin-top-10">
                <div className="row white">
                    <div className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">search</i>
                                <input value={this.state.searchKey} name="searchKey" onChange={this.handleOnChange} type="text" id="autocomplete-input" className="autocomplete" />
                                <label htmlFor="autocomplete-input">What are you looking for?</label>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    products.length === 0 &&
                    <h2>{isSearch ? 'No Results found for your search!!' : `${storeData.name} did not register a product yet.`}</h2>
                }
                <div className="col s12 margin-top-10">
                    <div className="margin-top-10"><a href={storeData.locationURL} target="_blank"><h1>{storeData.name}</h1></a></div>
                    <div className="date"><i className="map marker alternate icon"></i> {storeData.address}</div>
                    <div className="date margin-bottom-10"><i className="phone icon"></i> {storeData.phone}</div>
                    <br />
                    <div className="ui four doubling cards margin-top-10">
                        {
                            products.map((product, index) => {
                                return <div key={index} className="card">
                                    <div className="image">
                                        <img className="full-height full-width" alt={product.name} src={product.photoURL} />
                                    </div>
                                    <div className="content">
                                        <a href={`/product/${product._id}`} className="header">{product.name}</a>
                                        {
                                            product.placements.map((placement, placementIndex) => {
                                                return <div key={placementIndex} className="meta">
                                                    <span className="date"><i className="map marker alternate icon"></i> {`${placement.section} > ${placement.aisle} > ${placement.rack}`}</span>
                                                </div>;
                                            })
                                        }
                                    </div>
                                </div>;
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Store);
