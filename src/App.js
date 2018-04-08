import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import FirebaseUtil from './utils/FirebaseUtil';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);    
  }

  handleSignIn() {
    this.setState({authenticated: true});
  }

  handleSignOut() {
    this.setState({authenticated: false});
  }

  componentWillMount() {
    FirebaseUtil.initialize();
    FirebaseUtil.checkIsAuthenticated(this.handleSignIn)
  }

  render() {
    return (
      <div className="App">
        <LandingPage onAuthentication={this.handleSignIn} />
        {
          this.state.authenticated &&
          <div class="fixed-action-btn">
            <a onClick={() => FirebaseUtil.signOut(this.handleSignOut)} title="Sign Out" class="btn-floating btn-small red"><i class="material-icons">power_settings_new</i></a>
          </div>
        }
      </div>
    );
  }
}

export default App;
