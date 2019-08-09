import React, { useState, useEffect } from 'react';
import { match } from 'react-router-dom';
import { Container, Alert, Row, Col, Image, Button } from 'react-bootstrap';
import { SITE_NAME, PRODUCT_API } from '../config';
import { fetchUrl, FetchState } from '../util/fetchUrl';
import Product from '../entity/Product';

const ProductDetail: React.FC<{ match: match<{ id: string }> }> = ({ match }) => {
  const [product, setProduct] = useState('LOADING' as FetchState<Product>);
  useEffect(() => fetchUrl('GET', PRODUCT_API, { id: match.params.id }, setProduct), [match.params.id]);
  useEffect(() => {
    if (product !== 'LOADING' && product !== 'FAILED') {
      document.title = SITE_NAME + ' - ' + product.name;
    }
  }, [product]);

  return (
    <main className='py-4'>
      <Container>
        {
          product === 'LOADING' ? <Alert variant='light'>Loading...</Alert> :
            product === 'FAILED' ? <Alert variant='danger'>Sorry, failed to load the product data.</Alert> :
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
        }
      </Container>
    </main>
  );
};

export default ProductDetail;
