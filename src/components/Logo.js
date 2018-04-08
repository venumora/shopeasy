import React, { Component } from 'react';

class Logo extends Component {
  render() {
    return (
        <div className={`circle hoverable bold center-align se-logo-${this.props.sizeVariant}`}>
          <div className="col m6 s12 responsive-half lime darken-1 full-height">
            <div className="valign-wrapper full-height">
              <h4 className="col s12 text-shadow">Shop</h4>
            </div>
          </div>
          <div className="col m6 s12 responsive-half deep-orange darken-1 full-height">
            <div className="valign-wrapper full-height">
              <h4 className="col s12 text-shadow">Easy</h4>
            </div>
          </div>
        </div>
    );
  }
}

export default Logo;
