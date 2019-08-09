import React, { useState, useEffect } from 'react';
import { Container, Alert, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { PRODUCT_API } from '../config';
import { fetchUrl, FetchState } from '../util/fetchUrl';
import Product from '../entity/Product';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <Col md={4}>
      <Card className='mb-3'>
        <Image src={product.imageUrl} alt='' fluid />
        <Card.Body className='d-flex justify-content-between align-items-end'>
          <div>
            <Card.Subtitle className='mb-1'>{product.brand}</Card.Subtitle>
            <Card.Title className='mb-0'>{product.name}</Card.Title>
          </div>
          <Button variant='secondary' className='stretched-link' onClick={() => alert('Show detail')}>
            Detail
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState('LOADING' as FetchState<Product[]>);
  useEffect(() => fetchUrl('GET', PRODUCT_API, null, setProducts), []);

  return (
    <main className='py-4'>
      <Container>
        {
          products === 'LOADING' ? <Alert variant='light'>Loading...</Alert> :
            products === 'FAILED' ? <Alert variant='danger'>Sorry, failed to load the product data.</Alert> :
              <Row>
                {products.map(product => <ProductCard key={product.id} product={product} />)}
              </Row>
        }
      </Container>
    </main>
  );
};

export default ProductList;
