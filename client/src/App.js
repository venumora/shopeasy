import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import PreLoader from './components/PreLoader';
import FirebaseUtil from './utils/FirebaseUtil';
import API from './utils/API';
import Materialize from 'materialize-css';
import NoMatch from './components/NoMatch';
import StoreHome from './components/StoreHome';
import CustomerHome from './components/CustomerHome';
import CreateStore from './components/CreateStore';
import CreateProduct from './components/CreateProduct';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      _id: '',
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
          this.getStoreData(userFromDB, user.photoURL);
        } else {
          if (role) {
            API.saveUser({ id: user.uid, name: user.displayName, role: role }).then((newUser) => {
              if (newUser && newUser.data) {
                this.getStoreData(newUser, user.photoURL);
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

  getStoreData(dbUser, photoURL) {
    if (dbUser.data.role === 'store') {
      API.getStore(dbUser.data._id).then(store => {
        if (store && store.data) {
          this.setState({
            uid: dbUser.data.id,
            _id: dbUser.data._id,
            name: dbUser.data.name,
            isAuthenticated: true,
            loading: false,
            photoURL: photoURL,
            role: dbUser.data.role,
            store: store.data
          });
        } else {
          this.setState({
            uid: dbUser.data.id,
            _id: dbUser.data._id,
            name: dbUser.data.name,
            isAuthenticated: true,
            loading: false,
            photoURL: photoURL,
            role: dbUser.data.role,
          });
        }
      });
    } else {
      this.setState({
        uid: dbUser.data.id,
        _id: dbUser.data._id,
        name: dbUser.data.name,
        isAuthenticated: true,
        loading: false,
        photoURL: photoURL,
        role: dbUser.data.role
      });
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
    if (this.state.loading) {
      return (
        <div className="App">
          <PreLoader loading={this.state.loading} />
        </div>
      );
    }
    const { uid, name, photoURL, role, store, _id } = this.state;
    const user = { uid, name, photoURL, role, store, _id };
    return (
      <div className="App">
        <Router>
          <Switch>
            {
              !this.state.isAuthenticated &&
              <Route path="/" render={() => <LandingPage user={user} onAuthentication={this.handleSignIn} />} />
            }
            {
              this.state.isAuthenticated && role === 'customer' &&
              <Route exact path="/" render={() => <CustomerHome user={user} />} />
            }
            {
              this.state.isAuthenticated && role === 'store' &&
              <Route exact path="/" render={() => <StoreHome user={user} />} />
            }
            {
              this.state.isAuthenticated && role === 'store' && !user.store &&
              <Route exact path="/createstore" render={() => <CreateStore user={user} />} />
            }
            {
              this.state.isAuthenticated && role === 'store' && user.store &&
              <Route exact path="/createstore" render={() => <StoreHome user={user} />} />
            }
            {
              this.state.isAuthenticated && role === 'store' && user.store &&
              <Route exact path="/createproduct" render={() => <CreateProduct user={user} storeId={user.store._id} />} />     
            }
            <Route component={NoMatch} />
          </Switch>
        </Router>
        {
          this.state.isAuthenticated &&
          <div className="fixed-action-btn">
            <a className="btn-floating hoverable btn-large red">
              {photoURL && <img src={photoURL} alt={name.slice(0, 2)} className="circle profile-pic valign" />}
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
