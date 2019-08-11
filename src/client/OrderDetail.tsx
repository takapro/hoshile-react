import React, { useState, useEffect } from 'react';
import { match } from 'react-router-dom';
import { Container, Table, Image } from 'react-bootstrap';
import { ORDER_API } from '../config';
import { useSessionState } from '../Session';
import { documentTitle } from '../util/documentTitle';
import { fetchUrl, fetchCase, FetchState, LOADING, FAILED } from '../util/fetchUrl';
import { OrderHead, OrderDetail as OrderDetailEntity } from '../entity/Order';
import { calcPrice, calcTotalPrice } from '../entity/CartEntry';
import FetchAlert from './FetchAlert';

const DetailRow: React.FC<{ detail: OrderDetailEntity }> = ({ detail }) => {
  const { product, quantity } = detail;

  return (
    <tr>
      <td className='w-25'>
        <Image className='w-75' src={product.imageUrl} alt='' fluid />
      </td>
      <td>{product.brand}</td>
      <td>{product.name}</td>
      <td>{quantity}</td>
      <td>${product.price}</td>
      <td>${calcPrice(detail)}</td>
    </tr>
  );
};

const DetailTable: React.FC<{ details: OrderDetailEntity[] }> = ({ details }) => {
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
          details.map(each => <DetailRow key={each.product.id} detail={each} />)
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

const OrderDetail: React.FC<{ match: match<{ id: string }> }> = ({ match }) => {
  const { user } = useSessionState();
  const [order, setOrder] = useState(LOADING as FetchState<OrderHead>);

  useEffect(() => documentTitle('Order Detail'), []);
  useEffect(() => {
    if (user) {
      return fetchUrl('GET', ORDER_API, { id: match.params.id }, setOrder);
    }
  }, [match.params.id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className='py-4'>
      <Container>
        {
          fetchCase(user ? order : FAILED, order => (
            <>
              <h3 className='mb-3'>Shopping Cart</h3>
              <p className='mb-3'>Date: {order.createDate}</p>
              <DetailTable details={order.details} />
            </>
          ), FetchAlert('Sorry, failed to fetch order detail.'))
        }
      </Container>
    </main>
  );
};

export default OrderDetail;
