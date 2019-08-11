import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SessionProvider } from './Session';
import Header from './client/Header';
import AlertPage from './client/AlertPage';
import ProductList from './client/ProductList';
import ProductDetail from './client/ProductDetail';
import About from './client/About';
import UserLogin from './client/UserLogin';
import UserSignup from './client/UserSignup';
import UserProfile from './client/UserProfile';
import OrderList from './client/OrderList';
import OrderDetail from './client/OrderDetail';
import ShoppingCart from './client/ShoppingCart';
import Footer from './client/Footer';

const AdminPage: React.FC = () => {
  return (
    <>
      <Header />
      <AlertPage title='Admin Page' message='Admin pages are not implemented yet.' />
      <Footer />
    </>
  );
};

const ClientPage: React.FC = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path='/' component={ProductList} />
        <Route path='/product/:id' component={ProductDetail} />
        <Route path='/about' component={About} />
        <Route path='/login' component={UserLogin} />
        <Route path='/signup' component={UserSignup} />
        <Route path='/profile' component={UserProfile} />
        <Route path='/orderList' component={OrderList} />
        <Route path='/order/:id' component={OrderDetail} />
        <Route path='/shoppingCart' component={ShoppingCart} />
        <Route>
          <AlertPage title='Unknown Page' message='Sorry, page not found.' />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <SessionProvider>
      <BrowserRouter>
        <Switch>
          <Route path='/admin' component={AdminPage} />
          <Route component={ClientPage} />
        </Switch>
      </BrowserRouter>
    </SessionProvider>
  );
};

export default App;
