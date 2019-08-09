import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './client/Header';
import ProductList from './client/ProductList';
import ProductDetail from './client/ProductDetail';
import Footer from './client/Footer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route path='/product/:id' component={ProductDetail} />
        <Route path='/about'>About</Route>
        <Route path='/login'>Log in</Route>
        <Route path='/signup'>Sign up</Route>
        <Route path='/profile'>Profile</Route>
        <Route path='/orderList'>Order History</Route>
        <Route path='/shoppingCart'>Shopping Cart</Route>
        <Route>Unknown Page</Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
