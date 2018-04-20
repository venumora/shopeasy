import React, { Component } from 'react';
import API from '../utils/API';
import Materialize from 'materialize-css';
import Stores from './Stores';

class CustomerHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        this.setState({ photos: photos });

        if (this.offersCarousel && this.state.photos.length) {
          Materialize.Carousel.init(this.offersCarousel, {
            fullWidth: true,
            indicators: true
          });
        }
      }
      document.getElementById('store-home').classList.add('active');  
      document.getElementById('store-placements').classList.remove('active');    
    });
  }

  render() {
    const { photos } = this.state;
    return (
      <div className="ui container margin-top-10">
        {
          photos.length > 0 &&
          <div ref={s => this.offersCarousel = s} className="carousel carousel-slider center">
            {
              photos.map((pUrl, index) => {
                return <div key={index} className="carousel-item red white-text" href="#one!">
                  <div className="pos-abs full-width carousel-header margin-top-10">
                    <h1 className="ui inverted header">Latest Offers</h1>
                    <p className="white-text">Checkout our latest store offers</p>
                  </div>
                  <img className="full-height full-width" src={pUrl} alt="Store Offer" />
                </div>;
              })
            }
          </div>
        }
        <Stores />
      </div>
    );
  }
}

export default CustomerHome;
