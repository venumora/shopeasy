import React, { Component } from 'react';
import API from '../utils/API';
import { withRouter } from 'react-router';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placements: []
        }
    }

    componentDidMount() {
        API.getProduct(this.props.match.params.id).then(product => {
            if (product && product.data) {
                this.setState({ placements: product.data.placements });
            }
        });
    }

    render() {
        const { placements } = this.state;
        return (
            <div className="full-height deep-orange darken-1">
                <div className="ui vertical masthead aligned segment">
                    <div className="ui container full-height pos-rel">
                        <div className="col s12 margin-top-10">
                            <div className="ui three column grid">
                                {
                                    placements.map((placement, index) => {
                                        return <div key={index} className="column">
                                            <div className="ui card">
                                                <div className="content">
                                                    <div className="header">{placement.name}</div>
                                                    <div className="meta">{`${placement.section} > ${placement.aisle} > ${placement.rack}`}</div>
                                                    <div className="description">
                                                        <p>{placement.description}</p>
                                                    </div>
                                                </div>
                                                <div className="extra content">
                                                    <img className="full-height full-width" alt={placement.name} src={placement.photoURL} />
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

export default withRouter(Product);
