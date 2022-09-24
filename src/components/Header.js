import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser } from '../store/auth';
import { useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const isAuthenticated = async () => {
      await dispatch(getCurrentUser());
    };

    isAuthenticated();
  }, [dispatch]);

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="secondary"
        variant="light"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="/">
            <h1 className="navbar-header">Maggiano's</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/shop">Shop</Nav.Link>
            </Nav>
            <Nav>
              {!auth.currentUser && <Nav.Link href="/login">Login</Nav.Link>}
              {!auth.currentUser && <Nav.Link href="/signup">Signup</Nav.Link>}

              {auth.currentUser && <Nav.Link href="/signout">Signout</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
