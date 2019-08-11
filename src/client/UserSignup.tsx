import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { History } from 'history';
import { Container, Row, Col, Alert, Form, Button, Spinner } from 'react-bootstrap';
import { USER_API } from '../config';
import { useSessionDispatch, LOGGED_IN } from '../Session';
import { documentTitle } from '../util/documentTitle';
import { valueHandler } from '../util/valueHandler';
import { fetchUrl } from '../util/fetchUrl';
import { useFetchReducer, setFetchResult, START } from '../util/fetchReducer';

const UserSignup: React.FC<{ history: History }> = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [signupState, signupDispatch] = useFetchReducer();
  const sessionDispatch = useSessionDispatch();

  const signupDisabled = signupState.started || name === '' || email === '' || password1 === '' || password1 !== password2;

  useEffect(() => documentTitle('Sign up'), []);
  useEffect(() => {
    if (signupState.started) {
      return fetchUrl('POST', USER_API, { name, email, password: password1 }, setFetchResult(signupDispatch, (userId: number) => {
        sessionDispatch({ type: LOGGED_IN, userId, userName: name });
        history.push('/');
      }));
    }
  }, [signupState.started]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className='py-4'>
      <Container>
        <Row className='justify-content-center'>
          <Col md={6}>
            <h3 className='mb-3'>Please Sign up, or <Link to='/login'>Log in</Link></h3>
            {
              signupState.failed && <Alert variant='danger'>Signup failed.</Alert>
            }
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
              <Button type='submit' variant='primary' disabled={signupDisabled} onClick={() => signupDispatch(START)}>
                {
                  signupState.started && <Spinner as='span' className='mr-2' animation='border' size='sm' />
                }
                Sign up
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default withRouter(UserSignup);
