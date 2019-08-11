import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { Container, Table, Image, Button, Spinner } from 'react-bootstrap';
import { PRODUCT_API, ORDER_API } from '../config';
import { useSessionState, useSessionDispatch, MERGE_CART } from '../Session';
import { documentTitle } from '../util/documentTitle';
import { fetchUrl, fetchCase, FetchState, LOADING } from '../util/fetchUrl';
import { useFetchReducer, setFetchResult, START } from '../util/fetchReducer';
import { DetailEntry, joinProducts, calcPrice, calcTotalPrice } from '../entity/CartEntry';
import Product from '../entity/Product';
import FetchAlert from './FetchAlert';

const CartRow: React.FC<{ detail: DetailEntry }> = ({ detail }) => {
  const { product, quantity } = detail;
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
      <td>${calcPrice(detail)}</td>
    </tr>
  );
};

const CartTable: React.FC<{ details: DetailEntry[] }> = ({ details }) => {
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
          details.map(each => <CartRow key={each.product.id} detail={each} />)
        }
      </tbody>
      <tfoot>
        <tr>
          <td colSpan={4}></td>
          <th>Total</th>
          <td>${calcTotalPrice(details)}</td>
        </tr>
      </tfoot>
    </Table>
  );
};

const ShoppingCart: React.FC<{ history: History }> = ({ history }) => {
  const { user, shoppingCart } = useSessionState();
  const [products, setProducts] = useState(LOADING as FetchState<Product[]>);
  const [purchaseState, purchaseDispatch] = useFetchReducer();

  const disabled = user !== null && shoppingCart.length === 0;
  const onClick = user ? () => purchaseDispatch(START) : () => history.push('/login');

  useEffect(() => documentTitle('Shopping Cart'), []);
  useEffect(() => {
    const ids = shoppingCart.map(entry => entry.productId).join(',');
    fetchUrl('GET', PRODUCT_API, { ids }, setProducts);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (user && purchaseState.started) {
      const body = { userId: user.id, details: shoppingCart };
      return fetchUrl('POST', ORDER_API, body, setFetchResult(purchaseDispatch, (orderId: number) => {
        history.push('/order/' + orderId);
      }));
    }
  }, [purchaseState.started]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className='py-4'>
      <Container>
        {
          fetchCase(products, products => (
            <>
              <h3 className='mb-3'>Shopping Cart</h3>
              <CartTable details={joinProducts(shoppingCart, products)} />
              <div className='text-center'>
                <Button variant='primary' size='lg' className='w-25' disabled={disabled} onClick={onClick}>
                  {
                    purchaseState.started && <Spinner as='span' className='mr-2' animation='border' size='sm' />
                  }
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
