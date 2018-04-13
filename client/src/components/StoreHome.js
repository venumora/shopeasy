import React, { Component } from 'react';

class StoreHome extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="full-height lime darken-1">
        <div class="ui vertical masthead aligned segment">
          <div className="ui container full-height pos-rel">
            <div class="ui grid">
              <div className="four wide computer five wide tablet sixteen wide mobile column">
                <div class="ui card profile-card">
                  <div class="image">
                    <img alt={user.name} src={user.photoURL} />
                  </div>
                  <div class="content">
                    <a class="header">{user.name}</a>
                    <div class="description">
                      {
                        user.store ? user.store.name : 'You Have not created a Store yet!'
                      }
                    </div>
                  </div>
                  <div class="extra content">
                    <a>
                      <i class="product hunt icon"></i>
                      {`You have ${user.store && user.store.products ? user.store.products.length : 0} products`}
                    </a>
                  </div>
                </div>
              </div>
              {
                user.store &&
                <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
                  <h1 class="ui inverted header">{user.store.name}</h1>
                  <h2>Help your valuable customer to find things Easily!</h2>
                  <a href='/createstore' class="ui huge primary button">Add a Product <i class="add icon"></i></a>
                </div>
              }
              {
                !user.store &&
                <div className="twelve wide computer eleven wide tablet sixteen wide mobile column">
                  <h1 class="ui inverted header">Create a Store</h1>
                  <h2>Help your valuable customer to find things Easily!</h2>
                  <a href='/createstore' class="ui huge primary button">Create Store <i class="right arrow icon"></i></a>
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
