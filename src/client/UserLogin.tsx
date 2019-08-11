import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Form, Button, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { History } from 'history';
import { USER_API } from '../config';
import { useSessionDispatch, LOGGED_IN } from '../Session';
import User from '../entity/User';
import { FetchState, LOADING, FAILED, fetchUrl } from '../util/fetchUrl';
import { documentTitle } from '../util/documentTitle';
import { valueHandler } from '../util/valueHandler';

const UserLogin: React.FC<{ history: History }> = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginPressed, setLoginPressed] = useState(false);
  const [loginState, setLoginState] = useState(LOADING as FetchState<User>);
  const dispatch = useSessionDispatch();

  const loginDisabled = loginPressed || email === '' || password === '';
  const setLoginResult = (state: typeof FAILED | User): void => {
    if (state === FAILED) {
      setLoginState(state);
      setLoginPressed(false);
    } else {
      dispatch({ type: LOGGED_IN, userId: state.id as number, userName: state.name });
      history.push('/');
    }
  };

  useEffect(() => documentTitle('Log in'), []);
  useEffect(() => {
    if (loginPressed) {
      return fetchUrl('GET', USER_API, { email, password }, setLoginResult);
    }
  }, [loginPressed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className='py-4'>
      <Container>
        <Row className='justify-content-center'>
          <Col md={6}>
            <h3 className='mb-3'>Please Log in, or <Link to='/signup'>Sign up</Link></h3>
            {
              loginState === FAILED && <Alert variant='danger'>Login failed.</Alert>
            }
            <Form>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' value={email} onChange={valueHandler(setEmail)} autoFocus />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange={valueHandler(setPassword)} />
              </Form.Group>
              <Button type='submit' variant='primary' disabled={loginDisabled} onClick={() => setLoginPressed(true)}>
                {
                  loginPressed && <Spinner as='span' className='mr-2' animation='border' size='sm' />
                }
                Log in
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default withRouter(UserLogin);
