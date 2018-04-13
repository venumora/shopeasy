import React, { Component } from 'react';

class Home extends Component {
  render() {
    const { user, signOut } = this.props;
    return (
      <div className="fixed-action-btn">
        <a className="btn-floating hoverable btn-large red">
          {user.photoURL && <img src={user.photoURL} alt={user.name.slice(0, 2)} className="circle profile-pic responsive-img valign" />}
        </a>
        <ul>
          <li><a onClick={signOut} title="Sign Out" className="btn-floating btn-small red"><i className="material-icons">power_settings_new</i></a></li>
        </ul>
      </div>
    );
  }
}

export default Home;
