import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { documentTitle } from '../util/documentTitle';
import { valueHandler } from '../util/valueHandler';

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => documentTitle('Log in'), []);

  return (
    <main className='py-4'>
      <Container>
        <Row className='justify-content-center'>
          <Col md={6}>
            <h3 className='mb-3'>Please Log in, or <Link to='/signup'>Sign up</Link></h3>
            <Form>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' value={email} onChange={valueHandler(setEmail)} autoFocus />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={valueHandler(setPassword)} />
              </Form.Group>
              <Button variant='primary' onClick={() => alert('Loggin is as ' + email)}>Log in</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default UserLogin;
