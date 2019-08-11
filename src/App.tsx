import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SessionProvider } from './Session';
import Header from './client/Header';
import ProductList from './client/ProductList';
import ProductDetail from './client/ProductDetail';
import UserLogin from './client/UserLogin';
import UserSignup from './client/UserSignup';
import UserProfile from './client/UserProfile';
import OrderList from './client/OrderList';
import OrderDetail from './client/OrderDetail';
import ShoppingCart from './client/ShoppingCart';
import Footer from './client/Footer';

const App: React.FC = () => {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={ProductList} />
          <Route path='/product/:id' component={ProductDetail} />
          <Route path='/about'>About</Route>
          <Route path='/login' component={UserLogin} />
          <Route path='/signup' component={UserSignup} />
          <Route path='/profile' component={UserProfile} />
          <Route path='/orderList' component={OrderList} />
          <Route path='/order/:id' component={OrderDetail} />
          <Route path='/shoppingCart' component={ShoppingCart} />
          <Route>Unknown Page</Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </SessionProvider>
  );
};

export default App;
