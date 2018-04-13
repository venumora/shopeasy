import React, { Component } from 'react';

class NoMatch extends Component {
  render() {
    return (
        <div class="col s12 m9">
            <h1 class="header center-on-small-only">404</h1>
            <h4 class="light red-text text-lighten-4 center-on-small-only">Page not found.</h4>
        </div>
    );
  }
}

export default NoMatch;
