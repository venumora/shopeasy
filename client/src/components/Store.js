import React, { Component } from 'react';
import API from '../utils/API';
import { withRouter } from 'react-router';
import Materialize from 'materialize-css';


class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        }
    }

    componentDidMount() {
        API.getStore(this.props.match.params.id).then(store => {
            if (store && store.data) {
                this.setState({ products: store.data.products })
            }
        });
    }

    render() {
        const { products } = this.state;
        return (
            <div className="full-height deep-orange darken-1">
                <div className="ui vertical masthead aligned segment">
                    <div className="ui container full-height pos-rel">
                        <div className="col s12 margin-top-10">
                            <div className="ui three column grid">
                                {
                                    products.map((product, index) => {
                                        return <div key={index} className="column">
                                            <a href={`/product/${product._id}`} className="header">
                                                <div className="ui fluid card">
                                                    <div className="image">
                                                        <img className="full-height full-width" alt={product.name} src={product.photoURL} />
                                                    </div>
                                                    <div className="content">
                                                        <a href={`/product/${product._id}`} className="header">{product.name}</a>
                                                        {
                                                            product.placements.map(placement => {
                                                                return <div class="meta">
                                                                    <span class="date"><i class="map marker alternate icon"></i> { `${placement.section} > ${placement.aisle} > ${placement.rack}` }</span>
                                                                </div>;
                                                            })
                                                        }
                                                        <div class="description">
                                                            General products
                                                        </div>
                                                    </div>
                                                    <div class="extra content">
                                                    </div>
                                                </div>
                                            </a>
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
