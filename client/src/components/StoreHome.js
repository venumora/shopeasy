import React, { Component } from 'react';
import Materialize from 'materialize-css';
import Products from './Products';
import Placements from './Placements';

class StoreHome extends Component {
  componentDidMount() {
    const { user } = this.props;
    Materialize.Tabs.init(this.storeTabs);
    const validCarousel = user && user.store && user.store.photos.length > 0;
    if (validCarousel && this.photosCarousel) {
      Materialize.Carousel.init(this.photosCarousel, {
        fullWidth: true,
        indicators: true
      });
    }
    document.getElementById('store-home').classList.add('active');  
    document.getElementById('store-placements').classList.remove('active');    
    document.getElementById('store-products').classList.remove('active');          
  }

  render() {
    const { user } = this.props;
    let store = null, products = [], placements = [];

    if (user) {
      store = user.store;

      if (store) {
        products = store.products;
        placements = store.placements;
      }
    }

    return (
      <div className="ui container margin-top-10">
        {
          store && store.photos.length !== 0 &&
          <div ref={s => this.photosCarousel = s} className="carousel carousel-slider center">
            {
              store.photos.map((pUrl, index) => {
                return <div key={index} className="carousel-item red white-text" href="#one!">
                  <div className="pos-abs full-width carousel-header margin-top-10">
                    <h1 className="ui inverted header margin-top-10">{store.name}</h1>
                    <p className="white-text">Help your valuable customers to find things Easily!</p>
                  </div>
                  <img className="full-height full-width" src={pUrl} alt={store.name} />
                </div>;
              })
            }
          </div>
        }
        {
          store &&
          <div className="margin-top-10">
            <div className="col s12">
              <ul ref={t => this.storeTabs = t} className="tabs">
                <li className="tab col s3"><a href="#placements">Placements <span className="badge new deep-orange margin-top-10">{placements.length}</span></a></li>
                <li className="tab col s3"><a href="#products">Products <span className="badge new deep-orange margin-top-10">{products.length}</span></a></li>
              </ul>
            </div>
            <Placements user={user} />
            <Products user={user} />
          </div>
        }
        {
          !store &&
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
            <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
              <h1 className="ui inverted header">Create a Store</h1>
              <h2>Help your valuable customers to find things Easily!</h2>
              <a href='/createstore' className="ui primary button">Create Store <i className="right arrow icon"></i></a>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default StoreHome;
