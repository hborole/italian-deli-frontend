import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlineInstagram } from 'react-icons/ai';

export default function Footer() {
  return (
    <>
      <Navbar bg="light" variant="light" className="pt-5 pb-5">
        <Container>
          <>
            <img src="/assets/logo.jpeg" height="200" alt="Primos logo" />
            {/* Add a instagram icon */}
            <Nav className="ms-auto">
              <Nav.Link href="https://instagram.com/primo_primrose?igshid=YmMyMTA2M2Y=">
                <AiOutlineInstagram size="2em" />
              </Nav.Link>
            </Nav>
          </>

          <Navbar.Brand href="/"></Navbar.Brand>

          <Nav className="me-auto"></Nav>
          <Nav>
            <iframe
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d155.09101208430113!2d-0.15716235059100747!3d51.541533376788465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761bbe0c548c2b%3A0x36fc6d979797aca4!2sPrimo%20Italian%20Provisions!5e0!3m2!1sen!2sin!4v1665392592590!5m2!1sen!2sin"
              width="400"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
