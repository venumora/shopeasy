import React, { Component } from 'react';
import LandingPage from './components/LandingPage';
import PreLoader from './components/PreLoader';
import FirebaseUtil from './utils/FirebaseUtil';
import API from './utils/API';
import Materialize from 'materialize-css';
import NoMatch from './components/NoMatch';
import StoreHome from './components/StoreHome';
import Store from './components/Store';
import Stores from './components/Stores';
import Products from './components/Products';
import Placements from './components/Placements';
import Product from './components/Product';
import Placement from './components/Placement';
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
    window.location = '/';
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
        <div>
          <PreLoader role={user && user.role ? user.role : 'customer'} loading={loading} />
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

      document.body.classList.add(user.role);
    }

    return (
      <div className="ui vertical margin-bottom-30">
        {
          isAuthenticated &&
          <div className="ui container">
            <div className="ui pointing menu">
              <a href='/' id="store-home" className="active item js-menu-item">
                Home
              </a>
              <a href={user.role === 'customer' ? '/stores' : '/placements'} id="store-placements" className="item js-menu-item">
                {user.role === 'customer' ? 'Stores' : 'Placements'}
              </a>
              {
                user.role === 'store' &&
                <a href='/products' id="store-products" className="item js-menu-item">
                  Products
                </a>
              }
              <div className="right menu">
                <div className={`item hoverable${user.role === 'store' ? ' deep-orange darken-1' : ' lime darken-1'}`}>
                  <div className="ui transparent input bold text-shadow">
                    <i className="search icon"></i> Shop Easy
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
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
              isAuthenticated &&
              <Route exact path="/product/:id" render={() => <Product />} />
            }
            {
              isAuthenticated &&
              <Route exact path="/placement/:id" render={() => <Placement />} />
            }
            {
              isAuthenticated && user.role === 'customer' &&
              <Route exact path="/stores" render={() => <Stores />} />
            }
            {
              isAuthenticated && user.role === 'store' &&
              <Route exact path="/placements" render={() => <Placements user={user} />} />
            }
            {
              isAuthenticated && user.role === 'store' &&
              <Route exact path="/products" render={() => <Products user={user} />} />
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
              <li className="profile-card">
                <div className="ui card">
                  <div className="image">
                    <img alt={user.name} src={user.photoURL} />
                  </div>
                  <div className="content margin-bottom-24">
                    <a className="header">{user.name}</a>
                    <div className="description">
                      {
                        store ? store.name : user.role === 'store' ? 'You Have not created a Store yet!' : ''
                      }
                    </div>
                  </div>
                  <div className="extra content">
                    {
                      user.role === 'store' &&
                      <a>
                        <i className="product hunt icon"></i>
                        {`You have ${store && products ? products.length : 0} products`}
                      </a>
                    }
                  </div>
                </div>
              </li>
            </ul>
          </div>
        }
      </div>
    );
  }
}

export default App;
