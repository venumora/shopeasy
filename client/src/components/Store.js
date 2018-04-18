import React, { Component } from 'react';
import API from '../utils/API';
import { withRouter } from 'react-router';

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            searchKey: '',
            store: ''
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
                    this.setState({products: products.data});
                }
            });
        }

        state[event.target.name] = value;
        this.setState(state);
    }

    componentDidMount() {
        API.getStore(this.props.match.params.id).then(store => {
            if (store && store.data) {
                this.setState({ products: store.data.products, store: store.data._id });
            }
        });
    }

    render() {
        const { products } = this.state;
        return (
            <div className="full-height deep-orange darken-1">
                <div className="ui vertical masthead aligned segment">
                    <div className="ui container full-height pos-rel">
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
                        <div className="col s12 margin-top-10">
                            <div className="ui three column grid">
                                {
                                    products.map((product, index) => {
                                        return <div key={index} className="column">
                                            <div className="ui fluid card">
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
                                                    <div className="description">
                                                        General products
                                                        </div>
                                                </div>
                                                <div className="extra content">
                                                </div>
                                            </div>
                                        </div>;
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Store);
