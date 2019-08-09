import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { documentTitle } from '../util/documentTitle';
import { valueHandler } from '../util/valueHandler';

const UserSignup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  useEffect(() => documentTitle('Sign up'), []);

  return (
    <main className='py-4'>
      <Container>
        <Row className='justify-content-center'>
          <Col md={6}>
            <h3 className='mb-3'>Please Sign up, or <Link to='/login'>Log in</Link></h3>
            <Form>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type='text' value={name} onChange={valueHandler(setName)} autoFocus />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' value={email} onChange={valueHandler(setEmail)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password1} onChange={valueHandler(setPassword1)} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' value={password2} onChange={valueHandler(setPassword2)} />
              </Form.Group>
              <Button variant='primary' onClick={() => alert('Signing up as ' + name)}>Sign up</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default UserSignup;
