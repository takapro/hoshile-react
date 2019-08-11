import React, { useState, useEffect } from 'react';
import { match } from 'react-router-dom';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { PRODUCT_API } from '../config';
import { documentTitle } from '../util/documentTitle';
import { fetchUrl, fetchCase, FetchState, LOADING } from '../util/fetchUrl';
import Product from '../entity/Product';
import FetchAlert from './FetchAlert';

const ProductDetail: React.FC<{ match: match<{ id: string }> }> = ({ match }) => {
  const [product, setProduct] = useState(LOADING as FetchState<Product>);
  useEffect(() => fetchUrl('GET', PRODUCT_API, { id: match.params.id }, setProduct), [match.params.id]);
  useEffect(() => fetchCase(product, product => documentTitle(product.name)), [product]);

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
                <Button variant='primary' onClick={() => alert('Adding to Cart')}>Add to Cart</Button>
              </Col>
            </Row>
          ), FetchAlert('Sorry, failed to fetch product detail.'))
        }
      </Container>
    </main>
  );
};

export default ProductDetail;
