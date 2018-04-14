import React, { Component } from 'react';
import API from '../utils/API';
import Materialize from 'materialize-css';
import SEScanner from './SEScanner';

class CreateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',            
            price: '',
            keywords: ''            
        }

        this.handleOnSubmit = this.handleOnSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnScanned = this.handleOnScanned.bind(this);
    }


    componentDidMount() {
        let elem = document.querySelector('.chips');
        const options = {
            placeholder: 'Enter a Keyword',
            secondaryPlaceholder: 'Add more Keywords',
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
        this.setState({id});
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
                keywords: keywords 
            };

            API.saveProduct(productData).then(() => {
                window.location = '/';
            });
        }
    }

    render() {
        const { user } = this.props;
        return (
            <div className="full-height lime darken-1">
                <div className="ui vertical masthead aligned segment">
                    <div className="ui container full-height pos-rel">
                        <div className="ui grid">
                            <div className="four wide computer five wide tablet sixteen wide mobile column">
                                <div className="ui card profile-card">
                                    <div className="image">
                                        <img alt={user.name} src={user.photoURL} />
                                    </div>
                                    <div className="content">
                                        <a className="header">{user.name}</a>
                                        <div className="description">
                                            You are about to create a product
                                        </div>
                                    </div>
                                    <div className="extra content">
                                        Use camera se to scan Bar codes on Products
                                    </div>
                                </div>
                            </div>
                            <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
                                <form className="ui form" onSubmit={this.handleOnSubmit} >
                                    <div className="field">
                                        <label>Name of the Product</label>
                                        <input onChange={this.handleChange} type="text" value={this.state.name} name="name" placeholder="Name of the product" />
                                    </div>
                                    <div className="field">
                                        <label>Bar code ID</label>
                                        <SEScanner value={this.state.id} onScanned={this.handleOnScanned}/>
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
                                    <button className="ui button" type="submit">Submit</button>
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
