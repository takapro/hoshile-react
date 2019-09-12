import React, { useEffect } from 'react';
import { Container, Alert } from 'react-bootstrap';
import { documentTitle } from '../util/documentTitle';

const AlertPage: React.FC<{ title: string, message: string }> = ({ title, message }) => {
  useEffect(() => documentTitle(title), [title]);

  return (
    <main className='py-4'>
      <Container>
        <Alert variant='danger'>{message}</Alert>
      </Container>
    </main>
  );
};

export default AlertPage;
