import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { History } from 'history';
import { Container, Row, Col, Alert, Form, Button, Spinner } from 'react-bootstrap';
import { USER_API } from '../config';
import { useSessionState, useSessionDispatch, LOGGED_IN } from '../Session';
import { documentTitle } from '../util/documentTitle';
import { valueHandler } from '../util/valueHandler';
import { fetchUrl, fetchCase, FetchState, LOADING, FAILED } from '../util/fetchUrl';
import { useFetchReducer, setFetchResult, START } from '../util/fetchReducer';
import User from '../entity/User';
import FetchAlert from './FetchAlert';

const ProfileForm: React.FC<{ history: History, user: User }> = ({ history, user }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [profileState, profileDispatch] = useFetchReducer();
  const sessionDispatch = useSessionDispatch();

  const profileDisabled = profileState.started || name === '' || email === '';
  const submitProfile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    profileDispatch(START);
  };

  useEffect(() => documentTitle('Sign up'), []);
  useEffect(() => {
    if (profileState.started) {
      const body = { name, email };
      return fetchUrl('PUT', USER_API + '/profile', user.token, body, setFetchResult(profileDispatch, (user: User) => {
        sessionDispatch({ type: LOGGED_IN, user });
        history.push('/');
      }));
    }
  }, [profileState.started]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h3 className='mb-3'>Profile</h3>
      {
        profileState.failed && <Alert variant='danger'>Profile update failed.</Alert>
      }
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type='text' value={name} onChange={valueHandler(setName)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' value={email} onChange={valueHandler(setEmail)} />
        </Form.Group>
        <Button type='submit' variant='primary' disabled={profileDisabled} onClick={submitProfile}>
          {
            profileState.started && <Spinner as='span' className='mr-2' animation='border' size='sm' />
          }
          Update Profile
        </Button>
      </Form>
    </>
  );
};

const PasswordForm: React.FC<{ history: History, user: User }> = ({ history, user }) => {
  const [curPassword, setCurPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordState, passwordDispatch] = useFetchReducer();

  const passwordDisabled = passwordState.started || curPassword === '' || password1 === '' || password1 !== password2;
  const submitPassword = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault();
    passwordDispatch(START);
  };

  useEffect(() => documentTitle('Sign up'), []);
  useEffect(() => {
    if (passwordState.started) {
      const body = { curPassword, newPassword: password1 };
      return fetchUrl('PUT', USER_API + '/password', user.token, body, setFetchResult(passwordDispatch, (user: User) => {
        history.push('/');
      }));
    }
  }, [passwordState.started]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <h3 className='mb-3'>Password</h3>
      {
        passwordState.failed && <Alert variant='danger'>Password update failed.</Alert>
      }
      <Form>
        <Form.Group>
          <Form.Label>Current Password</Form.Label>
          <Form.Control type='password' value={curPassword} onChange={valueHandler(setCurPassword)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>New Password</Form.Label>
          <Form.Control type='password' value={password1} onChange={valueHandler(setPassword1)} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control type='password' value={password2} onChange={valueHandler(setPassword2)} />
        </Form.Group>
        <Button type='submit' variant='primary' disabled={passwordDisabled} onClick={submitPassword}>
          {
            passwordState.started && <Spinner as='span' className='mr-2' animation='border' size='sm' />
          }
          Update Password
        </Button>
      </Form>
    </>
  );
};

const UserProfile: React.FC<{ history: History }> = ({ history }) => {
  const session = useSessionState();
  const [user, setUser] = useState(LOADING as FetchState<User>);

  useEffect(() => documentTitle('Profile'), []);
  useEffect(() => {
    if (session.user) {
      return fetchUrl('GET', USER_API + '/profile', session.user.token, null, setUser);
    }
  }, [session.user && session.user.token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className='py-4'>
      <Container>
        <Row className='justify-content-center'>
          <Col md={6}>
            {
              fetchCase(session.user ? user : FAILED, user => (
                <>
                  <ProfileForm history={history} user={user} />
                  <hr className='my-4' />
                  <PasswordForm history={history} user={user} />
                </>
              ), FetchAlert('Sorry, failed to fetch user profile.'))
            }
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default withRouter(UserProfile);
