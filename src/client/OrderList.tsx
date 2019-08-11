import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { Container, Table } from 'react-bootstrap';
import { ORDER_API } from '../config';
import { useSessionState } from '../Session';
import { documentTitle } from '../util/documentTitle';
import { fetchUrl, fetchCase, FetchState, LOADING, FAILED } from '../util/fetchUrl';
import { OrderHead } from '../entity/Order';
import { calcTotalPrice } from '../entity/CartEntry';
import FetchAlert from './FetchAlert';

const OrderTable: React.FC<{ history: History, orders: OrderHead[] }> = ({ history, orders }) => {
  return (
    <Table hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>#Items</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {
          orders.map(order => (
            <tr key={order.id} onClick={() => history.push('/order/' + order.id)}>
              <td>{order.createDate}</td>
              <td>{order.details.length}</td>
              <td>${calcTotalPrice(order.details)}</td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  );
};

const OrderList: React.FC<{ history: History }> = ({ history }) => {
  const { user } = useSessionState();
  const [orders, setOrders] = useState(LOADING as FetchState<OrderHead[]>);

  useEffect(() => documentTitle('Order Detail'), []);
  useEffect(() => {
    if (user) {
      return fetchUrl('GET', ORDER_API, { userId: user.id }, setOrders);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className='py-4'>
      <Container>
        {
          fetchCase(user ? orders : FAILED, orders => (
            <>
              <h3 className='mb-3'>Order History</h3>
              <OrderTable history={history} orders={orders} />
            </>
          ), FetchAlert('Sorry, failed to fetch order list.'))
        }
      </Container>
    </main>
  );
};

export default withRouter(OrderList);
