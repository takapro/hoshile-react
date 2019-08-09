import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path='/'>Home</Route>
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
