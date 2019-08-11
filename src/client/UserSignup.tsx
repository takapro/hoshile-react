import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Form, Button, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { History } from 'history';
import { USER_API } from '../config';
import { useSessionDispatch, LOGGED_IN } from '../Session';
import { FetchState, LOADING, FAILED, fetchUrl } from '../util/fetchUrl';
import { documentTitle } from '../util/documentTitle';
import { valueHandler } from '../util/valueHandler';

const UserSignup: React.FC<{ history: History }> = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [signupPressed, setSignupPressed] = useState(false);
  const [signupState, setSignupState] = useState(LOADING as FetchState<number>);
  const dispatch = useSessionDispatch();

  const signupDisabled = signupPressed || name === '' || email === '' || password1 === '' || password1 !== password2;
  const setSignupResult = (state: typeof FAILED | number): void => {
    if (state === FAILED) {
      setSignupState(state);
      setSignupPressed(false);
    } else {
      dispatch({ type: LOGGED_IN, userId: state as number, userName: name });
      history.push('/');
    }
  };

  useEffect(() => documentTitle('Sign up'), []);
  useEffect(() => {
    if (signupPressed) {
      return fetchUrl('POST', USER_API, { name, email, password: password1 }, setSignupResult);
    }
  }, [signupPressed]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className='py-4'>
      <Container>
        <Row className='justify-content-center'>
          <Col md={6}>
            <h3 className='mb-3'>Please Sign up, or <Link to='/login'>Log in</Link></h3>
            {
              signupState === FAILED && <Alert variant='danger'>Signup failed.</Alert>
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
              <Button type='submit' variant='primary' disabled={signupDisabled} onClick={() => setSignupPressed(true)}>
                {
                  signupPressed && <Spinner as='span' className='mr-2' animation='border' size='sm' />
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
