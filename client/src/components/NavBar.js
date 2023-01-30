import { Link } from "react-router-dom";
import { Navbar, Nav, Container} from "react-bootstrap";

export default function NavBar() {
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Paste and Share</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/createpaste">Create paste</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}