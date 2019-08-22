import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Button } from 'react-bootstrap';
import { PRODUCT_API } from '../config';
import { documentTitle } from '../util/documentTitle';
import { fetchUrl, fetchCase, FetchState, LOADING } from '../util/fetchUrl';
import Product from '../entity/Product';
import FetchAlert from './FetchAlert';

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
          <Link to={'/product/' + product.id}>
            <Button variant='secondary' className='stretched-link'>Detail</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState(LOADING as FetchState<Product[]>);

  useEffect(() => documentTitle(), []);
  useEffect(() => fetchUrl('GET', PRODUCT_API, null, setProducts), []);

  return (
    <main className='py-4'>
      <Container>
        {
          fetchCase(products, products => (
            <Row>
              {products.map(product => <ProductCard key={product.id} product={product} />)}
            </Row>
          ), FetchAlert('Sorry, failed to fetch product list.'))
        }
      </Container>
    </main>
  );
};

export default ProductList;
