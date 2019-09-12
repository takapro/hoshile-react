import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { SITE_NAME } from '../config';

const Header: React.FC = () => {
  return (
    <header className='py-4'>
      <Container className='text-center'>
        <h1><Link to='/'>{SITE_NAME + ' (React)'}</Link></h1>
      </Container>
    </header>
  );
};

export default Header;
