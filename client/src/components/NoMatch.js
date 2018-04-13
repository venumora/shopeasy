import React, { Component } from 'react';

class NoMatch extends Component {
  render() {
    return (
      <div className="ui masthead vertical segment">
        <div className="ui container">
          <div className="ui negative message">
            <div className="header">
              We're sorry we can't find the resource you are looking for
            </div>
            <p>404 resource not found</p>
          </div>
        </div>
      </div>      
    );
  }
}

export default NoMatch;
