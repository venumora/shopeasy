import React, { Component } from 'react';
import API from '../utils/API';
import Materialize from 'materialize-css';


class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stores: []
    }
  }

  componentDidMount() {
    API.getStores().then(stores => {
      if (stores && stores.data) {
        this.setState({ stores: stores.data })
      }
    });

    Materialize.Carousel.init(this.offersCarousel, {
      fullWidth: true,
      indicators: true
    });
  }

  render() {
    const { stores } = this.state;
    return (
      <div className="full-height deep-orange darken-1">
        <div className="ui vertical masthead aligned segment">
          <div className="ui container full-height pos-rel">
            <div ref={s => this.offersCarousel = s} className="carousel carousel-slider center">
              <div className="carousel-item red white-text" href="#one!">
                <img className="full-height full-width" src="/images/walgreens.jpg" alt="walgreens" />
              </div>
              <div className="carousel-item amber white-text" href="#two!">
                <img className="full-height full-width" src="/images/safeway.jpg" alt="safeway" />
              </div>
              <div className="carousel-item green white-text" href="#three!">
                <img className="full-height full-width" src="/images/maycs.jpg" alt="maycs" />
              </div>
              <div className="carousel-item blue white-text" href="#four!">
                <img className="full-height full-width" src="/images/target.jpg" alt="target" />
              </div>
            </div>
            <div className="col s12 margin-top-10">
              <div className="ui three column grid">
                {
                  stores.map((store, index) => {

                    return <div key={index} className="column">
                      <a href={`/store/${store._id}`} className="header">
                        <div className="ui fluid card">
                          <div className="image">
                            <img className="full-height full-width" alt={store.name} src={store.logoUrl} />
                          </div>
                          <div className="content">
                            <a href={`/store/${store._id}`} className="header">{store.name}</a>
                            <div class="meta">
                              <span class="date"><i class="map marker alternate icon"></i> Belmond</span>
                            </div>
                            <div class="description">
                              General stores
                            </div>
                          </div>
                          <div class="extra content">
                              <a>
                                <i class="product hunt icon"></i>
                                {store.products.length} products</a>
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

export default CustomerHome;
