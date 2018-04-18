import React, { Component } from 'react';
import API from '../utils/API';
import Materialize from 'materialize-css';


class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: [],
      photos: []
    }
  }

  componentDidMount() {
    API.getStores().then(stores => {
      if (stores && stores.data) {
        const photos = [];
        stores.data.forEach(store => {
          if (store.photos) {
            store.photos.forEach(photo => {
              photos.push(photo);
            });
          }
        });
        this.setState({ stores: stores.data, photos: photos });

        if (this.offersCarousel && this.state.photos.length) {
          Materialize.Carousel.init(this.offersCarousel, {
            fullWidth: true,
            indicators: true
          });
        }
      }
    });
  }

  render() {
    const { stores, photos } = this.state;
    return (
      <div className="full-height deep-orange darken-1">
        <div className="ui vertical masthead aligned segment">
          <div className="ui container full-height pos-rel">
            <div ref={s => this.offersCarousel = s} className="carousel carousel-slider center">
              {
                photos.map(pUrl => {
                  return <div className="carousel-item red white-text" href="#one!">
                    <div className="pos-abs full-width carousel-header">
                      <h1 className="ui inverted header margin-top-10">Latest Offers</h1>
                      <p class="white-text">Checkout our latest store offers</p>
                    </div>
                    <img className="full-height full-width" src={pUrl} alt="Store Offer" />
                  </div>;
                })
              }
            </div>
            <div className="col s12 margin-top-10">
              <div className="ui four doubling cards">
                {
                  stores.map((store, index) => {
                    return <div key={index} className="card">
                      <div className="image">
                        <img className="full-height full-width" alt={store.name} src={store.logoUrl} />
                      </div>
                      <div className="content">
                        <a href={`/store/${store._id}`} className="header">{store.name}</a>
                        <div className="meta">
                          <span className="date"><i className="map marker alternate icon"></i> Belmond</span>
                        </div>
                        <div className="description">
                          General stores
                            </div>
                      </div>
                      <div className="extra content">
                        <a>
                          <i className="product hunt icon"></i>
                          {store.products.length} products</a>
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

export default CustomerHome;
