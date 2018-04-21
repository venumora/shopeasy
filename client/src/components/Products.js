import React, { Component } from 'react';

class Products extends Component {
    componentDidMount() {
        document.getElementById('store-home').classList.remove('active');
        document.getElementById('store-placements').classList.remove('active');
        document.getElementById('store-products').classList.add('active');
    }

    render() {
        const { user } = this.props;
        let store = null, products = [];

        if (user) {
            store = user.store;

            if (store) {
                products = store.products;
            }
        }

        return (
            <div id="products" className="ui container margin-top-10">
                {
                    store &&
                    <div className="col s12">
                        <div className="row margin-top-10">
                            <div className="col s12">
                                <a href='/createproduct' className="ui primary button">Add a Product <i className="add icon"></i></a>
                            </div>
                            <div className="col s12 margin-top-10">
                                <div className="ui four doubling cards">
                                    {
                                        products.map((product, index) => {
                                            return <div key={index} className="card">
                                                <div className="image">
                                                    <img alt={product.name} src={product.photoURL} />
                                                </div>
                                                <div className="content">
                                                    <a href={`/product/${product._id}`} className="header">{product.name}</a>
                                                </div>
                                            </div>;
                                        })
                                    }
                                    {
                                        products.length === 0 &&
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
            </div>
        );
    }
}

export default Products;
