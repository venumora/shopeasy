import React, { Component } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import PreLoader from './components/PreLoader';
import FirebaseUtil from './utils/FirebaseUtil';
import API from './utils/API';
import Materialize from 'materialize-css';
import NoMatch from './components/NoMatch';
import StoreHome from './components/StoreHome';
import Store from './components/Store';
import Product from './components/Product';
import CustomerHome from './components/CustomerHome';
import CreateStore from './components/CreateStore';
import CreateProduct from './components/CreateProduct';
import CreatePlacement from './components/CreatePlacement';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthenticated: false,
      loading: true,
      photoURL: ''
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
          this.updateState(userFromDB, user.photoURL);
        } else {
          if (role) {
            API.saveUser({ id: user.uid, name: user.displayName, role: role }).then((newUser) => {
              if (newUser && newUser.data) {
                this.updateState(newUser, user.photoURL);
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

  updateState(dbUser, photoURL) {
    this.setState({
      user: dbUser.data,
      isAuthenticated: true,
      loading: false,
      photoURL: photoURL,
    });
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
    const { user, photoURL, isAuthenticated, loading } = this.state;
    let store = null, products = [], placements = [];

    if (loading) {
      return (
        <div className="App">
          <PreLoader loading={loading} />
        </div>
      );
    }

    if (user) {
      user.photoURL = photoURL;
      store = user.store;

      if (store) {
        products = store.products;
        placements = store.placements;
      }
    }

    return (
      <div className="App">
        <Router>
          <Switch>
            {
              !isAuthenticated &&
              <Route path="/" render={() => <LandingPage user={user} onAuthentication={this.handleSignIn} />} />
            }
            {
              isAuthenticated && user.role === 'customer' &&
              <Route exact path="/" render={() => <CustomerHome user={user} />} />
            }
            {
              isAuthenticated && user.role === 'store' &&
              <Route exact path="/" render={() => <StoreHome user={user} />} />
            }
            {
              isAuthenticated && user.role === 'store' && !store &&
              <Route exact path="/createstore" render={() => <CreateStore userId={user._id} />} />
            }
            {
              isAuthenticated && user.role === 'store' && store &&
              <Route exact path="/createstore" render={() => <StoreHome user={user} />} />
            }
            {
              isAuthenticated && user.role === 'store' && store &&
              <Route exact path="/createproduct" render={() => <CreateProduct placements={placements} productsLength={products.length} storeId={store._id} />} />
            }
            {
              isAuthenticated && user.role === 'store' && store &&
              <Route exact path="/createplacement" render={() => <CreatePlacement placementsLength={placements.length} storeId={store._id} />} />
            }
            {
              isAuthenticated && user.role === 'customer' &&
              <Route exact path="/store/:id" render={() => <Store />} />
            }
            {
              isAuthenticated && user.role === 'customer' &&
              <Route exact path="/product/:id" render={() => <Product />} />
            }
            <Route component={NoMatch} />
          </Switch>
        </Router>
        {
          isAuthenticated &&
          <div className="fixed-action-btn">
            <a className={`btn-floating hoverable btn-large ${user.role === 'customer' ? 'lime' : 'red'}`}>
              {user.photoURL && <img src={photoURL} alt={user.name.slice(0, 2)} className="circle profile-pic valign" />}
            </a>
            <ul>
              <li><a onClick={this.signOut} title="Sign Out" className={`btn-floating btn-small ${user.role === 'customer' ? 'lime' : 'red'}`}><i className="material-icons">power_settings_new</i></a></li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default App;
