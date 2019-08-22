import React, { useState, useEffect } from 'react';
import { withRouter, match } from 'react-router-dom';
import { History } from 'history';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { PRODUCT_API } from '../config';
import { useSessionDispatch, MERGE_CART } from '../Session';
import { documentTitle } from '../util/documentTitle';
import { fetchUrl, fetchCase, FetchState, LOADING } from '../util/fetchUrl';
import Product from '../entity/Product';
import FetchAlert from './FetchAlert';

const ProductDetail: React.FC<{ match: match<{ id: string }>, history: History }> = ({ match, history }) => {
  const sessionDispatch = useSessionDispatch();
  const [product, setProduct] = useState(LOADING as FetchState<Product>);

  useEffect(() => fetchCase(product, product => documentTitle(product.name)), [product]);
  useEffect(() => fetchUrl('GET', PRODUCT_API, { id: match.params.id }, setProduct), [match.params.id]);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const addToCart = (product: Product) => () => {
    sessionDispatch({ type: MERGE_CART, cart: [{ productId: product.id, quantity: 1 }] });
    history.push('/shoppingCart');
  };

  return (
    <main className='py-4'>
      <Container>
        {
          fetchCase(product, product => (
            <Row>
              <Col md={8}>
                <Image src={product.imageUrl} alt='' fluid />
              </Col>
              <Col md={4} className='mt-4'>
                <h6>{product.brand}</h6>
                <h4>{product.name}</h4>
                <p>Price: ${product.price}</p>
                <Button variant='primary' onClick={addToCart(product)}>Add to Cart</Button>
              </Col>
            </Row>
          ), FetchAlert('Sorry, failed to fetch product detail.'))
        }
      </Container>
    </main>
  );
};

export default withRouter(ProductDetail);
