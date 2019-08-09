import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { LOADING } from '../util/fetchUrl';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const FetchAlert = (message: string) => (state: 'LOADING' | 'FAILED') => {
  if (state === LOADING) {
    return (
      <Alert variant='light' className='d-flex align-items-center'>
        <Spinner animation='grow' />
        <div className='ml-3'>Loading...</div>
      </Alert>
    );
  } else {
    return <Alert variant='danger'>{message}</Alert>;
  }
};

export default FetchAlert;
