import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="pt-5 pb-5">
        <Container>
          <img src="/assets/logo.jpeg" height="100" alt="Primos logo" />
          <Navbar.Brand href="/"></Navbar.Brand>

          <Nav className="me-auto"></Nav>
          <Nav></Nav>
        </Container>
      </Navbar>
    </>
  );
}
