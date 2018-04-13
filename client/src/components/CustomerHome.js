import React, { Component } from 'react';

class CustomerHome extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="full-height deep-orange darken-1">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomerHome;
