import React, { Component } from 'react';
import Materialize from 'materialize-css';
import JsBarcode from 'jsbarcode';

class StoreHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalInstance: null
    }

    this.showBarcodes = this.showBarcodes.bind(this);
  }

  componentDidMount() {
    Materialize.Tabs.init(this.storeTabs);

    let modalInstance = Materialize.Modal.init(this.barcodes);
    this.setState({ modalInstance });
  }

  showBarcodes() {
    const { user } = this.props;

    if (this.state.modalInstance) {
      this.state.modalInstance.open();
    }

    if (user && user.store && user.store.placements) {
      user.store.placements.forEach((placement, index) => {
        JsBarcode(`#barcode${index}`, placement.id, { format: "CODE39", displayValue: true });
      });
    }
  }

  render() {
    const { user } = this.props;
    const { store } = user;
    const { placements, products } = store;
    return (
      <div className="lime darken-1">
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
                      {
                        store ? store.name : 'You Have not created a Store yet!'
                      }
                    </div>
                  </div>
                  <div className="extra content">
                    <a>
                      <i className="product hunt icon"></i>
                      {`You have ${store && products ? products.length : 0} products`}
                    </a>
                  </div>
                </div>
              </div>
              {
                store &&
                <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
                  <h1 className="ui inverted header">{store.name}</h1>
                  <h2>Help your valuable customers to find things Easily!</h2>
                </div>
              }
              {
                store &&
                <div className="row">
                  <div className="col s12">
                    <ul ref={t => this.storeTabs = t} className="tabs">
                      <li className="tab col s3"><a href="#placements">Placements</a></li>
                      <li className="tab col s3"><a href="#products">Products</a></li>
                    </ul>
                  </div>
                  <div id="placements" className="col s12">
                    <div className="row margin-top-10">
                      <div className="col s12">
                        <a href='/createplacement' className="ui primary button">Add a Placement <i className="add icon"></i></a>
                        <button onClick={this.showBarcodes} className="ui primary button">Show Barcodes</button>
                      </div>
                      <div className="col s12 margin-top-10">
                        <div className="ui three column grid">
                          {
                            placements.map((placement, index) => {
                              return <div key={index} className="column">
                                <div className="ui fluid card">
                                  <div className="image">
                                    <img alt={placement.name} src={placement.photoURL} />
                                  </div>
                                  <div className="content">
                                    <a href={`/placement/${placement._id}`} className="header">{placement.name}</a>
                                  </div>
                                </div>
                              </div>;
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="products" className="col s12">
                    <div className="row margin-top-10">
                      <div className="col s12">
                        <a href='/createproduct' className="ui primary button">Add a Product <i className="add icon"></i></a>
                      </div>
                      <div className="col s12 margin-top-10">
                        <div className="ui three column grid">
                          {
                            products.map((product, index) => {
                              return <div key={index} className="column">
                                <div className="ui fluid card">
                                  <div className="image">
                                    <img alt={product.name} src={product.photoURL} />
                                  </div>
                                  <div className="content">
                                    <a href={`/product/${product._id}`} className="header">{product.name}</a>
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
              }
              {
                !store &&
                <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
                  <h1 className="ui inverted header">Create a Store</h1>
                  <h2>Help your valuable customers to find things Easily!</h2>
                  <a href='/createstore' className="ui primary button">Create Store <i className="right arrow icon"></i></a>
                </div>
              }
              <div ref={s => this.barcodes = s} className="modal">
                <div className="modal-content left-align">
                  <div className="ui cards col s12">
                    {
                      placements.map((placement, index) => {
                        return <div key={index} className="card full-width">
                          <div className="content">
                            <div className="header">{placement.name}</div>
                            <div className="meta">{placement.section} {placement.aisle} {placement.rack}</div>
                            <div className="description">
                              <svg width="0" height="0" className="margin-top-10 margin-bottom-10" id={`barcode${index}`}></svg>
                            </div>
                          </div>
                        </div>;
                      })
                    }
                  </div>
                </div>
                <div className="modal-footer">
                  <a className="btn modal-action modal-close waves-effect red waves-red">Cancel</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StoreHome;
