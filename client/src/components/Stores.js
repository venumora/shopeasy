import React, { Component } from 'react';
import API from '../utils/API';

class Stores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stores: []
        }
    }

    componentDidMount() {
        API.getStores().then(stores => {
            if (stores && stores.data) {
                this.setState({ stores: stores.data });
            }
        });
        document.getElementById('store-home').classList.remove('active');
        document.getElementById('store-placements').classList.add('active');
    }

    render() {
        const { stores } = this.state;
        return (
            <div className="ui container margin-top-10">
                <div className="ui four doubling cards">
                    {
                        stores.map((store, index) => {
                            return <div key={index} className="card">
                                <div className="image">
                                    <img className="full-height full-width" alt={store.name} src={store.logoURL} />
                                </div>
                                <div className="content">
                                    <a href={`/store/${store._id}`} className="header">{store.name}</a>
                                    <div className="meta">
                                        <span className="date"><i className="map marker alternate icon"></i> {store.address}</span>
                                    </div>
                                </div>
                                <div className="extra content">
                                    <a><i className="product hunt icon"></i>{store.products.length} products</a>
                                </div>
                            </div>;
                        })
                    }
                </div>
            </div>
        );
    }
}

export default Stores;
