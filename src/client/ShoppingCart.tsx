import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { Container, Table, Image, Button } from 'react-bootstrap';
import { PRODUCT_API } from '../config';
import { useSessionState, useSessionDispatch, MERGE_CART } from '../Session';
import { documentTitle } from '../util/documentTitle';
import { fetchUrl, fetchCase, FetchState, LOADING } from '../util/fetchUrl';
import { CartEntry, joinProducts } from '../entity/CartEntry';
import Product from '../entity/Product';
import FetchAlert from './FetchAlert';

const CartRow: React.FC<{ product: Product, quantity: number }> = ({ product, quantity }) => {
  const sessionDispatch = useSessionDispatch();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const updateQuantity = (quantity: number) => () =>
    sessionDispatch({ type: MERGE_CART, cart: [{ productId: product.id, quantity }] });

  return (
    <tr>
      <td className='w-25'>
        <Image className='w-75' src={product.imageUrl} alt='' fluid />
      </td>
      <td>{product.brand}</td>
      <td>{product.name}</td>
      <td>
        <Button variant='light' size='sm' onClick={updateQuantity(-1)}>-</Button>
        <span className='mx-2'>{quantity}</span>
        <Button variant='light' size='sm' onClick={updateQuantity(1)}>+</Button>
      </td>
      <td>${product.price}</td>
      <td>${parseFloat('' + product.price) * quantity}</td>
    </tr>
  );
};

const CartTable: React.FC<{ cart: CartEntry[], products: Product[] }> = ({ cart, products }) => {
  const joinedCart = joinProducts(cart, products);
  const totalPrice = joinedCart.reduce((acc, each) => acc + parseFloat('' + each.product.price) * each.quantity, 0);

  return (
    <Table>
      <thead>
        <tr>
          <th>Image</th>
          <th>Brand</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {
          joinedCart.map(each => <CartRow key={each.product.id} product={each.product} quantity={each.quantity} />)
        }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}></td>
          <th>Total</th>
          <td>${totalPrice}</td>
        </tr>
      </tfoot>
    </Table>
  );
};

const ShoppingCart: React.FC<{ history: History }> = ({ history }) => {
  const { user, shoppingCart } = useSessionState();
  const [products, setProducts] = useState(LOADING as FetchState<Product[]>);

  const disabled = user !== null && shoppingCart.length === 0;
  const onClick = user ? () => alert('purchasing') : () => history.push('/login');

  useEffect(() => documentTitle('Shopping Cart'), []);
  useEffect(() => fetchUrl('GET', PRODUCT_API, { ids: shoppingCart.map(entry => entry.productId).join(',') }, setProducts), []);

  return (
    <main className='py-4'>
      <Container>
        {
          fetchCase(products, products => (
            <>
              <h3 className='mb-3'>Shopping Cart</h3>
              <CartTable cart={shoppingCart} products={products} />
              <div className='text-center'>
                <Button variant='primary' size='lg' className='w-25' disabled={disabled} onClick={onClick}>
                  { user ? 'Purchase' : 'Please Log in' }
                </Button>
              </div>
            </>
          ), FetchAlert('Sorry, failed to fetch shopping cart.'))
        }
      </Container>
    </main>
  );
};

export default withRouter(ShoppingCart);
