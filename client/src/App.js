import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import PreLoader from './components/PreLoader';
import FirebaseUtil from './utils/FirebaseUtil';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loading: true
    }

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.signOut = this.signOut.bind(this);    
  }

  handleSignIn(isAuthenticated, role, user) {
    this.setState({ isAuthenticated: isAuthenticated, loading: false });
  }

  handleSignOut() {
    this.setState({ isAuthenticated: false, loading: false });
  }

  signOut() {
    this.setState({ loading: true });    
    FirebaseUtil.signOut(this.handleSignOut)
  }

  componentWillMount() {
    FirebaseUtil.initialize();
    FirebaseUtil.checkIsAuthenticated(this.handleSignIn)
  }

  render() {
    return (
      <div className="App">
        <PreLoader loading={this.state.loading} />
        {
          !this.state.isAuthenticated &&
          <LandingPage onAuthentication={this.handleSignIn} />
        }
        {
          this.state.isAuthenticated &&
          <div class="fixed-action-btn">
            <a onClick={this.signOut} title="Sign Out" class="btn-floating btn-small red"><i class="material-icons">power_settings_new</i></a>
          </div>
        }
      </div>
    );
  }
}

export default App;
