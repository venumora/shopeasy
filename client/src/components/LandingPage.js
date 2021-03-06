import React, { Component } from 'react';
import Logo from './Logo';
import FirebaseUtil from '../utils/FirebaseUtil';
import GoogleIcon from '../images/google.png';

class LandingPage extends Component {
  render() {
    return (
      <div className="row margin-zero full-height-vh">
        <Logo className="center-align" sizeVariant="large" />
        <div className="col m6 s12 responsive-half deep-orange darken-1">
          <div className="col s12 full-height pos-rel">
            <div className="login-contaier center-align">
              <a onClick={() => FirebaseUtil.signIn('customer', this.props.onAuthentication)} className="btn-floating grey lighten-5 btn-large pulse"><img alt="Google" className="responsive-img" src={GoogleIcon} /></a>
              <h3 className="col s12 text-shadow">Login as a Customer with Google</h3>              
            </div>
          </div>
        </div>
        <div className="col m6 s12 responsive-half lime darken-1 full-height">
          <div className="col s12 full-height pos-rel">
            <div className="login-contaier center-align">
              <a onClick={() => FirebaseUtil.signIn('store', this.props.onAuthentication)} className="btn-floating grey lighten-5 btn-large pulse"><img alt="Google" className="responsive-img" src={GoogleIcon} /></a>
              <h3 className="col s12 text-shadow">Login as a Store with Google</h3>                            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
