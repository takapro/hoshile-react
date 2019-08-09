import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { STORE_NAME } from '../config';

const Header: React.FC = () => {
  return (
    <>
      <header className='py-4'>
        <Container className='text-center'>
          <h1><Link to='/'>{STORE_NAME}</Link></h1>
        </Container>
      </header>
      <Navbar expand='md' variant='dark' bg='dark' sticky='top'>
        <Container>
          <Navbar.Brand as={Link} to='/'>{STORE_NAME}</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar-content' aria-label='Toggle navigation' />
          <Navbar.Collapse id='navbar-content'>
            <Nav className='mr-auto'>
              <Nav.Link as={NavLink} exact to='/'>Home</Nav.Link>
              <Nav.Link as={NavLink} to='/about'>About</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link as={NavLink} to='/login'>Log in</Nav.Link>
              <Nav.Link as={NavLink} to='/signup'>Sign up</Nav.Link>
              <NavDropdown id='navbar-dropdown' title='{username}'>
                <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/orderList'>Order History</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => alert('Logged out!')}>Log out</NavDropdown.Item>
              </NavDropdown>
              <Nav.Item className='ml-2'>
                <Link to='/shoppingCart'>
                  <Button variant='warning'>Cart</Button>
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
