import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { SITE_NAME } from '../config';
import { useSessionState, useSessionDispatch, LOGGED_OUT } from '../Session';

const Header: React.FC = () => {
  const { user } = useSessionState();
  const dispatch = useSessionDispatch();

  return (
    <>
      <header className='py-4'>
        <Container className='text-center'>
          <h1><Link to='/'>{SITE_NAME}</Link></h1>
        </Container>
      </header>
      <Navbar expand='md' variant='dark' bg='dark' sticky='top'>
        <Container>
          <Navbar.Brand as={Link} to='/'>{SITE_NAME}</Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar-content' aria-label='Toggle navigation' />
          <Navbar.Collapse id='navbar-content'>
            <Nav className='mr-auto'>
              <Nav.Link as={NavLink} exact to='/'>Home</Nav.Link>
              <Nav.Link as={NavLink} to='/about'>About</Nav.Link>
            </Nav>
            <Nav>
              {
                user ?
                  <NavDropdown id='navbar-dropdown' title={user.name}>
                    <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to='/orderList'>Order History</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => dispatch({ type: LOGGED_OUT })}>Log out</NavDropdown.Item>
                  </NavDropdown>
                  :
                  <>
                    <Nav.Link as={NavLink} to='/login'>Log in</Nav.Link>
                    <Nav.Link as={NavLink} to='/signup'>Sign up</Nav.Link>
                  </>
              }
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
