import React, { Component } from 'react';

class StoreHome extends Component {
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
                      {
                        user.store ? user.store.name : 'You Have not created a Store yet!'
                      }
                    </div>
                  </div>
                  <div className="extra content">
                    <a>
                      <i className="product hunt icon"></i>
                      {`You have ${user.store && user.store.products ? user.store.products.length : 0} products`}
                    </a>
                  </div>
                </div>
              </div>
              {
                user.store &&
                <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
                  <h1 className="ui inverted header">{user.store.name}</h1>
                  <h2>Help your valuable customer to find things Easily!</h2>
                  <a href='/createproduct' className="ui huge primary button">Add a Product <i className="add icon"></i></a>
                </div>
              }
              {
                !user.store &&
                <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
                  <h1 className="ui inverted header">Create a Store</h1>
                  <h2>Help your valuable customer to find things Easily!</h2>
                  <a href='/createstore' className="ui huge primary button">Create Store <i className="right arrow icon"></i></a>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StoreHome;
