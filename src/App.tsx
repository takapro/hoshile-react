import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { BASE_PATH } from './config';
import { SessionProvider } from './Session';
import Header from './view/Header';
import Navigation from './view/Navigation';
import AlertPage from './page/AlertPage';
import ProductList from './page/ProductList';
import ProductDetail from './page/ProductDetail';
import About from './page/About';
import UserLogin from './page/UserLogin';
import UserSignup from './page/UserSignup';
import UserProfile from './page/UserProfile';
import OrderList from './page/OrderList';
import OrderDetail from './page/OrderDetail';
import ShoppingCart from './page/ShoppingCart';
import Footer from './view/Footer';

const AdminPage: React.FC = () => {
  return (
    <>
      <Header />
      <Navigation />
      <AlertPage title='Admin Page' message='Admin pages are not implemented yet.' />
      <Footer />
    </>
  );
};

const ClientPage: React.FC = () => {
  return (
    <>
      <Header />
      <Navigation />
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
      <BrowserRouter basename={BASE_PATH}>
        <Switch>
          <Route path='/admin' component={AdminPage} />
          <Route component={ClientPage} />
        </Switch>
      </BrowserRouter>
    </SessionProvider>
  );
};

export default App;
