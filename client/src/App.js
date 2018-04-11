import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import PreLoader from './components/PreLoader';
import FirebaseUtil from './utils/FirebaseUtil';
import API from './utils/API';
import Materialize from 'materialize-css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      name: '',
      isAuthenticated: false,
      loading: true,
      photoURL: '',
      role: ''
    }

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.signOut = this.signOut.bind(this);    
  }

  componentDidUpdate() {
    let elem = document.querySelector('.fixed-action-btn');
    Materialize.FloatingActionButton.init(elem);
  }

  handleSignIn(isAuthenticated, role, user) {
    if (isAuthenticated) {
      API.getUser(user.uid).then((userFromDB) => {
        if (userFromDB && userFromDB.data) {
          this.setState({ 
            uid: userFromDB.data.id,
            name: userFromDB.data.name,
            isAuthenticated: isAuthenticated,
            loading: false,
            photoURL: user.photoURL,
            role: userFromDB.data.role
          });        
        } else {
          if (role) {
            API.saveUser({ id: user.uid, name: user.displayName, role: role }).then((newUser) => {
              if (newUser && newUser.data) {
                this.setState({ 
                  uid: newUser.data.id,
                  name: newUser.data.name,
                  isAuthenticated: isAuthenticated,
                  loading: false,
                  photoURL: user.photoURL,
                  role: newUser.data.role
                 });            
              }
            });
          } else {
            this.signOut();
          }
        }
      });
    } else {
      this.setState({ isAuthenticated: isAuthenticated, loading: false });              
    }
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
          <div className="fixed-action-btn">
            <a className="btn-floating hoverable btn-large red">
              { this.state.photoURL && <img src={this.state.photoURL} alt={this.state.name.slice(0, 2)} className="circle profile-pic responsive-img valign" /> }
            </a>
            <ul>
              <li><a onClick={this.signOut} title="Sign Out" className="btn-floating btn-small red"><i className="material-icons">power_settings_new</i></a></li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default App;
