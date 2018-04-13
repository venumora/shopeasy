import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import PreLoader from './components/PreLoader';
import FirebaseUtil from './utils/FirebaseUtil';
import API from './utils/API';
import Materialize from 'materialize-css';
import NoMatch from './components/NoMatch';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


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
    const { uid, name, photoURL, role } = this.state;
    const user = { uid, name, photoURL, role };
    return (
      <div className="App">
        <PreLoader loading={this.state.loading} />        
        <Router>
          <Switch>
            {
              !this.state.isAuthenticated &&
              <Route exact path="/" render={()=><LandingPage user={user} onAuthentication={this.handleSignIn} />} />
            }
            {
              this.state.isAuthenticated &&
              <Route exact path="/" render={()=><Home user={user} signOut={this.signOut} />} />
            }
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
